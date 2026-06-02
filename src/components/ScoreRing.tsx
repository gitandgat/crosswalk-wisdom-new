interface ScoreRingProps {
  score: number;
  size?: number;
}

export function ScoreRing({ score, size = 180 }: ScoreRingProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const getColor = () => {
    if (score <= 30) return '#4A7C59';
    if (score <= 60) return '#D4A574';
    return '#2C2C2C';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="transform -rotate-90" style={{ width: size, height: size }}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E8C9A0"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-ring"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-4xl font-bold text-charcoal">{score}</span>
        <span className="text-sm text-charcoal-light font-sans">/100</span>
      </div>
    </div>
  );
}
