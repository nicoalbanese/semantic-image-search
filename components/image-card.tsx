"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/CkNni01Hrgr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { CardContent, Card } from "@/components/ui/card";
import { DBImage } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { MatchBadge } from "./match-badge";

export function ImageCard({
  image,
  similarity,
}: {
  image: DBImage;
  similarity?: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <Card
      className={cn("w-full h-72")}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show ? null : (
        <Image
          alt={image.title}
          className="rounded-lg object-cover"
          height="200"
          src={image.path}
          width="400"
        />
      )}

      <CardContent className="p-4">
        {show ? (
          <>
            <div className="space-y-2">
              {similarity ? (
                <div className="py-2">
                  <MatchBadge
                    type={similarity === 1 ? "direct" : "semantic"}
                    similarity={similarity}
                  />
                </div>
              ) : null}
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 overflow-y-clip">
                {image.description.slice(0, 280)}
              </p>
              <p className="text-xs font-medium text-gray-400 italic">
                Generated by GPT-4o
              </p>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
