"use server";

import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from ".";
import { DBImage, images } from "./schema";
import { generateEmbedding } from "../ai/utils";

export const findSimilarContent = async (description: string) => {
  const embedding = await generateEmbedding(description);
  console.log(embedding);
  const similarity = sql<number>`1 - (${cosineDistance(images.embedding, embedding)})`;
  const similarGuides = await db
    .select({ image: images, similarity })
    .from(images)
    .where(gt(similarity, 0.3))
    .orderBy((t) => desc(t.similarity))
    .limit(10);

  return similarGuides;
};

export const getImages = async (query?: string): Promise<DBImage[]> => {
  console.log(query);
  try {
    if (query === undefined) {
      const i = await db.select().from(images);
      return i;
    } else {
      console.log(query);
      const i = await findSimilarContent(query);
      console.log(i);
      return i.map((img) => ({ ...img.image, similarity: img.similarity }));
    }
  } catch (e) {
    console.error(e);
    throw Error();
  }
};
