interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

function getScoreColor(score: number): string {
  if (score >= 75) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Aclamado";
  if (score >= 75) return "Favorável";
  if (score >= 50) return "Misto";
  return "Desfavorável";
}

export default function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm font-bold",
    md: "w-14 h-14 text-xl font-bold",
    lg: "w-20 h-20 text-3xl font-black",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} ${getScoreColor(score)} rounded flex items-center justify-center text-white`}
      >
        {score}
      </div>
      {size !== "sm" && (
        <span className="text-xs text-gray-400 font-medium">
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
