import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";
import { ImageMetadata, getJpgFiles, writeAllMetadataToFile } from "./utils";
import fs from "fs";

dotenv.config();

async function main() {
  const files = await getJpgFiles("public/images/");
  console.log("files to process:\n", files);

  const images: ImageMetadata[] = [];

  for (const file of files) {
    console.clear();
    console.log(
      `Generating description for ${file} (${files.indexOf(file) + 1}/${files.length})`,
    );
    const path = `public/images/${file}`;
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        image: z.object({
          title: z.string().describe("an artistic title for the image"),
          description: z
            .string()
            .describe("A one sentence description of the image"),
          vibes: z.array(z.string()),
        }),
      }),
      maxTokens: 512,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe the image in detail." },
            {
              type: "image",
              image: fs.readFileSync(path),
            },
          ],
        },
      ],
    });
    images.push({ path: `/images/${file}`, metadata: result.object.image });
  }
  await writeAllMetadataToFile(images, "imagesWithMetadata.json");
  console.log("All images processed!");
}

main().catch(console.error);
