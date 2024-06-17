/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tm9EX5NO8KN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { ImageStreamStatus } from "@/lib/utils";

export function LoadingSpinner({ status }: { status: ImageStreamStatus }) {
  if (status.regular || status.semantic)
    return (
      <div className="absolute h-full w-full bg-white z-10 opacity-90 flex items-start justify-center">
        {true ? (
          <div className="flex flex-col items-center space-y-4 pt-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent dark:border-gray-50 dark:border-t-transparent" />
            <p className="text-gray-500 dark:text-gray-400">
              Search for{" "}
              {status.regular ? "direct matches" : "semantic results"}
              ...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-500 rounded-full p-3">
              <CheckIcon className="h-6 w-6 text-white" />
            </div>
            <p className="text-green-500 font-medium">Search Completed</p>
          </div>
        )}
      </div>
    );
  else return null;
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
