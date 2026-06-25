interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border p-6 bg-white dark:bg-neutral-900">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}