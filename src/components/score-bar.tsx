import { cn } from "@/lib/utils";
import type { DimensionScore } from "@/types";

interface ScoreBarProps {
  score: DimensionScore;
  highlighted?: boolean;
  accent?: string;
}

export function ScoreBar({ score, highlighted, accent }: ScoreBarProps) {
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
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            highlighted ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {score.percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            !highlighted && "opacity-50"
          )}
          style={{
            width: `${score.percentage}%`,
            backgroundColor: highlighted
              ? accent ?? "var(--primary)"
              : "var(--muted-foreground)",
          }}
        />
      </div>
    </div>
  );
}
