export const SearchQuery = ({
  query,
  resetQuery,
}: {
  query?: string;
  resetQuery: () => void;
}) => {
  if (query === undefined) return <div className="w-full h-6" />;
  return (
    <div className="text-zinc-700 h-6">
      search query: <span className="font-medium italic">{query}</span>
      <button className="ml-4" onClick={resetQuery}>
        clear
      </button>
    </div>
  );
};
