"use server";

import { cosineDistance, desc, gt, or, sql } from "drizzle-orm";
import { db } from ".";
import { DBImage, images } from "./schema";
import { generateEmbedding } from "../ai/utils";
import { createStreamableValue } from "ai/rsc";

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

export const findImageByQuery = async (query: string) => {
  const result = await db
    .select({ image: images, similarity: sql<number>`1` })
    .from(images)
    .where(
      or(
        sql`title ILIKE ${"%" + query + "%"}`,
        sql`description ILIKE ${"%" + query + "%"}`,
        sql`vibes @> ARRAY[${query}]::text[]`,
      ),
    );
  return result;
};

export const getImages = async (query?: string): Promise<DBImage[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    if (query === undefined) {
      const i = await db.select().from(images);
      return i;
    } else {
      const i = await findSimilarContent(query);
      return i.map((img) => ({
        ...img.image,
        similarity: img.similarity,
      }));
    }
  } catch (e) {
    console.error(e);
    throw Error();
  }
};

function uniqueItemsByObject(items: DBImage[]): DBImage[] {
  const seenObjects = new Set<string>();
  const uniqueItems: DBImage[] = [];

  for (const item of items) {
    if (!seenObjects.has(item.title)) {
      seenObjects.add(item.title);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export const getImagesStreamed = async (query?: string) => {
  const imgs = createStreamableValue<DBImage[]>();
  (async () => {
    try {
      if (query === undefined) {
        const i = await db.select().from(images);
        imgs.done(i);
      } else {
        const iN = await findImageByQuery(query);
        imgs.update(
          iN.map((img) => ({
            ...img.image,
            similarity: img.similarity,
          })),
        );
        const i = await findSimilarContent(query);
        imgs.done(
          uniqueItemsByObject(
            [...iN, ...i].map((img) => ({
              ...img.image,
              similarity: img.similarity,
            })),
          ),
        );
      }
    } catch (e) {
      console.error(e);
      throw Error();
    }
  })();
  return imgs.value;
};
