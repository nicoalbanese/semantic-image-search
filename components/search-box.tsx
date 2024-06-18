"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/GHXhZDO4KL4
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { TransitionStartFunction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { debounce } from "lodash";
import { X } from "lucide-react";

export function SearchBox({
  query,
  startTransition,
}: {
  query: string | null;
  startTransition: TransitionStartFunction;
}) {
  const [input, setInput] = useState(query ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const validQuery = input.length > 2;

  const router = useRouter();

  const search = debounce(() => {
    if (input !== query) {
      startTransition(() => {
        let newParams = new URLSearchParams([["q", input]]);
        input.length === 0 ? router.push("/") : router.push(`?${newParams}`);
      });
    }
  }, 200);

  const resetQuery = () => {
    startTransition(() => {
      setInput("");
      router.push(`/`);
      router.refresh();
      inputRef.current?.focus();
    });
  };

  useEffect(() => {
    if (validQuery) {
      search();
    }
    if (input.length === 0 && query) {
      resetQuery();
    }
    return () => {
      search.cancel();
    };
  }, [input]);

  return (
    <div className="pt-4 flex flex-col">
      <form
        className="w-full mx-auto mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (validQuery) search();
        }}
      >
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-4 w-5 h-5 text-gray-500" />
          <Input
            autoFocus
            value={input}
            ref={inputRef}
            minLength={3}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(event) => {
              if (event.metaKey && event.key === "Backspace") {
                resetQuery();
              }
            }}
            className={
              "w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500"
            }
            placeholder="Search..."
          />
          {input.length > 0 ? (
            <Button
              className="absolute right-2 text-gray-400 rounded-full h-8 w-8"
              variant="ghost"
              type="reset"
              size={"icon"}
              onClick={() => resetQuery()}
            >
              <X height="16" width="16" />
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
