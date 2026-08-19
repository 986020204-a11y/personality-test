import { cn } from "@/lib/utils";
import type { DimensionScore } from "@/types";

interface ScoreBarProps {
  score: DimensionScore;
  highlighted?: boolean;
  accent?: string;
}

export function ScoreBar({ score, highlighted, accent }: ScoreBarProps) {
  return (
    <div className="group">
      <div className="mb-1 flex items-baseline justify-between">
        <span
          className={cn(
            "text-sm",
            highlighted ? "font-bold text-foreground" : "font-medium text-muted-foreground"
          )}
        >
          {score.label}
        </span>
        <span
          className={cn(
            "text-xs tabular-nums",
            highlighted ? "font-bold" : "font-medium text-muted-foreground"
          )}
          style={highlighted ? { color: accent } : undefined}
        >
          {score.percentage}%
        </span>
      </div>
      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full",
          highlighted ? "bg-secondary" : "bg-secondary/60"
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${score.percentage}%`,
            backgroundColor: highlighted ? accent : "var(--muted-foreground)",
            opacity: highlighted ? 1 : 0.35,
          }}
        />
      </div>
    </div>
  );
}
