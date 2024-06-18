import dotenv from "dotenv";
import { getJpgFiles } from "./utils";
import { put } from "@vercel/blob";
import fs from "fs";

dotenv.config();

async function main() {
  const basePath = "images-to-index";
  const files = await getJpgFiles(basePath);

  for (const file of files) {
    const filePath = basePath + "/" + file;
    const fileContent = fs.readFileSync(filePath);

    console.clear();
    console.log(
      `Uploading ${file} (${files.indexOf(file) + 1}/${files.length}) to Blob storage`,
    );
    try {
      await put(file, fileContent, { access: "public" });
      console.log(`Uploaded ${file}`);
    } catch (e) {
      console.error(e);
    }
  }
  console.log("All images uploaded!");
}

main().catch(console.error);
