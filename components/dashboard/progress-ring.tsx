interface Props {
  progress: number;
}

export default function ProgressRing({
  progress,
}: Props) {

  const radius = 80;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) *
      circumference;

  return (
    <div className="flex justify-center">
      <svg
        width="200"
        height="200"
      >
        <circle
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          strokeWidth="12"
          stroke="#e5e7eb"
        />

        <circle
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          strokeWidth="12"
          stroke="black"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}