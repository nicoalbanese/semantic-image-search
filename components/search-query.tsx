import { Button } from "./ui/button";

export const SearchQuery = ({
  query,
  resetQuery,
}: {
  query?: string;
  resetQuery: () => void;
}) => {
  return (
    <div className="text-zinc-700 h-6 flex items-center">
      {query === undefined || query.length === 0 ? (
        <div>Search for an image!</div>
      ) : (
        <div>
          Search query: <span className="font-medium italic">{query}</span>
          <Button
            className="ml-4"
            variant={"outline"}
            size={"sm"}
            onClick={resetQuery}
          >
            clear
          </Button>
        </div>
      )}
    </div>
  );
};
