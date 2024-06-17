"use client";

import { SearchBox } from "@/components/search-box-copy";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return (
    <main className="p-8 space-y-4">
      <h1 className="font-medium text-2xl">
        Semantic Image Search (using Vercel AI SDK)
      </h1>
      <p>
        This demo showcases how to use the Vercel AI SDK to build semantic
        search applications. Try it out by searching for an image. Your query
        will be embedded and then compared against the embedded image titles and
        descriptions (generated by GPT-4o).
      </p>
      <div className="border-border border-t pt-4 space-y-4">
        <SearchBox query={searchParams.get("q")} />
        <Fragment key={searchParams.get("q")}>{children}</Fragment>
      </div>
    </main>
  );
}
