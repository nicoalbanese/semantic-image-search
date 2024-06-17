import { Badge } from "@/components/ui/badge";

export const MatchBadge = ({
  type,
  similarity,
}: {
  type: "direct" | "semantic";
  similarity?: number;
}) => {
  return (
    <div className="flex">
      <Badge variant={"secondary"}>{type} match</Badge>
      {type === "semantic" ? (
        <Badge variant={"outline"}>similarity: {similarity?.toFixed(3)}</Badge>
      ) : null}
    </div>
  );
};
