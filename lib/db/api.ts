"use server";

import {
  cosineDistance,
  desc,
  getTableColumns,
  gt,
  or,
  sql,
} from "drizzle-orm";
import { db } from ".";
import { DBImage, images } from "./schema";
import { generateEmbedding } from "../ai/utils";
import { createStreamableValue } from "ai/rsc";
import { kv } from "@vercel/kv";
import { ImageStreamStatus } from "../utils";

export const findSimilarContent = async (description: string) => {
  const { embedding: e, ...rest } = getTableColumns(images);
  const imagesWithoutEmbedding = {
    ...rest,
    embedding: sql<number[]>`ARRAY[]::integer[]`,
  };

  const embedding = await generateEmbedding(description);
  const similarity = sql<number>`1 - (${cosineDistance(images.embedding, embedding)})`;
  const similarGuides = await db
    .select({ image: imagesWithoutEmbedding, similarity })
    .from(images)
    .where(gt(similarity, 0.28))
    .orderBy((t) => desc(t.similarity))
    .limit(12);

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
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const imgs = createStreamableValue<DBImage[]>();
  const status = createStreamableValue<ImageStreamStatus>({
    regular: true,
    semantic: false,
  });

  (async () => {
    try {
      const queryFormatted = query
        ? "q:" + query?.replaceAll(" ", "_")
        : "all_images";
      const cached = await kv.get<DBImage[]>(queryFormatted);
      // console.log(queryFormatted, cached ? "HIT" : "MISS");
      if (cached) {
        imgs.done(cached);
        status.done({ regular: false, semantic: false });
        return { images: imgs.value, status: status.value };
      }

      const { embedding, ...rest } = getTableColumns(images);
      const imagesWithoutEmbedding = {
        ...rest,
        embedding: sql<number[]>`ARRAY[]::integer[]`,
      };
      if (query === undefined || query.length < 3) {
        const i = await db
          .select(imagesWithoutEmbedding)
          .from(images)
          .limit(20);
        imgs.done(i);
        await kv.set("all_images", JSON.stringify(i));
      } else {
        status.update({ semantic: true, regular: false });
        const iN = await findImageByQuery(query);
        imgs.update(
          iN.map((img) => ({
            ...img.image,
            similarity: img.similarity,
          })),
        );
        const i = await findSimilarContent(query);
        const aggregated = uniqueItemsByObject(
          [...iN, ...i].map((img) => ({
            ...img.image,
            similarity: img.similarity,
          })),
        );

        imgs.done(aggregated);
        await kv.set(queryFormatted, JSON.stringify(aggregated));
      }
      status.done({ regular: false, semantic: false });
    } catch (e) {
      console.error(e);
    }
  })();
  return { images: imgs.value, status: status.value };
};
