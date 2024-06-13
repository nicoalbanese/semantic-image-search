"use client";

import { useRouter } from "next/navigation";

export const SearchQuery = ({ query }: { query?: string }) => {
  const router = useRouter();
  if (query === undefined) return null;
  return (
    <div className="text-zinc-700">
      search query: <span className="font-medium italic">{query}</span>
      <button
        className="ml-4"
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
      >
        clear
      </button>
    </div>
  );
};
