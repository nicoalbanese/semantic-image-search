import { Badge } from "@/components/ui/badge";

export const MatchBadge = ({
  type,
  similarity,
}: {
  type: "direct" | "semantic";
  similarity?: number;
}) => {
  return (
    <div className="flex space-x-2">
      <Badge variant={"secondary"}>{type} match</Badge>
      {type === "semantic" ? (
        <Badge variant={"default"} className="bg-green-500 text-black">
          similarity: {similarity?.toFixed(3)}
        </Badge>
      ) : null}
    </div>
  );
};
