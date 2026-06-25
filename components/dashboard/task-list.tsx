"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskList({ tasks }: any) {
  const [items, setItems] = useState(tasks);
  const router = useRouter();

  async function toggleTask(
    id: string,
    completed: boolean
  ) {
    try {
      const res = await fetch(
        `/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      // Instant UI update
      setItems((prev: any[]) =>
        prev.map((task: any) =>
          task.id === id
            ? {
                ...task,
                completed: !completed,
              }
            : task
        )
      );

      // Refresh server components
      router.refresh();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-3">
      {items.map((task: any) => (
        <div
          key={task.id}
className={`
border rounded-xl p-4 flex items-center gap-3
${
  task.dueDate &&
  new Date(task.dueDate) < new Date() &&
  !task.completed
    ? "border-red-500"
    : ""
}
`}        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              toggleTask(
                task.id,
                task.completed
              )
            }
            className="h-4 w-4"
          />

          <div>

  <p
    className={
      task.completed
        ? "line-through text-gray-400"
        : ""
    }
  >
    {task.title}
  </p>

  {task.dueDate && (

    <p className="text-xs text-gray-500">

      Due:{" "}

      {new Date(
        task.dueDate
      ).toLocaleDateString()}

    </p>

  )}

</div>
        </div>
      ))}
    </div>
  );
}