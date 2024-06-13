import fs from "fs";
import path from "path";

export type ImageMetadata = {
  path: string;
  metadata: {
    title: string;
    description: string;
    vibe: string[];
  };
};

/**
 * Asynchronously gets all `.jpg` files in the specified directory.
 *
 * @param dir The directory to search within.
 * @returns A promise that resolves to an array of filenames.
 */
export async function getJpgFiles(dir: string): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(dir);
    const jpgFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".jpg",
    );
    return jpgFiles;
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
}

/**
 * Writes all metadata to a single JSON file.
 *
 * @param metadataArray An array of metadata objects.
 * @param outputPath The path including filename to the output JSON file.
 */
export async function writeAllMetadataToFile(
  metadataArray: ImageMetadata[],
  outputPath: string,
) {
  try {
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(metadataArray, null, 2),
    );
    console.log(`All metadata written to ${outputPath}`);
  } catch (error) {
    console.error("Error writing metadata to file:", error);
    throw error;
  }
}
