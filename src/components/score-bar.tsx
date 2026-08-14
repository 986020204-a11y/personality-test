import { cn } from "@/lib/utils";
import type { DimensionScore } from "@/types";

interface ScoreBarProps {
  score: DimensionScore;
  highlighted?: boolean;
}

// A single labeled horizontal bar for one dimension score.
export function ScoreBar({ score, highlighted }: ScoreBarProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span
          className={cn(
            "text-sm font-medium",
            highlighted ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {score.label}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {score.percentage}%
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            highlighted ? "bg-primary" : "bg-muted-foreground/50"
          )}
          style={{ width: `${score.percentage}%` }}
        />
      </div>
    </div>
  );
}
