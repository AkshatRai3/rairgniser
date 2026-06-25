"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectTaskForm({
  projectId,
}: {
  projectId: string;
}) {

  const [title, setTitle] =
    useState("");

  const router =
    useRouter();
  
  const [dueDate, setDueDate] =
  useState("");

  async function createTask() {

    if (!title.trim()) return;

    const res =
      await fetch(
        "/api/project-tasks",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            projectId,
            dueDate,
          }),
        }
      );

    if (res.ok) {

      setTitle("");
window.location.reload();
    }

  }

  return (
    
    
    <div className="border rounded-xl p-5 mb-8">

      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Task title"
        className="border p-2 rounded w-full"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        className="border p-2 rounded w-full mt-3"
      />

      <button
        onClick={createTask}
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Create Task
      </button>

    </div>
  );
}