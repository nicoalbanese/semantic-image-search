import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";
import { ImageMetadata, getJpgFiles, writeAllMetadataToFile } from "./utils";
import fs from "fs";

dotenv.config();

async function main() {
  const files = await getJpgFiles("public/images/test/");
  console.log("files to process:\n", files);

  const images: ImageMetadata[] = [];

  for (const file of files) {
    const path = `public/images/test/${file}`;
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        image: z.object({
          title: z.string().describe("an artistic title for the image"),
          description: z
            .string()
            .describe("A one sentence description of the image"),
          vibe: z.array(z.string()),
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
    images.push({ path, metadata: result.object.image });
  }
  await writeAllMetadataToFile(images, "imagesWithMetadata.json");
}

main().catch(console.error);
