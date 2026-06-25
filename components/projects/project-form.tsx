"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({
  goalId,
}: {
  goalId: string;
}) {
  const [title, setTitle] = useState("");

  const router = useRouter();

  async function createProject() {
    if (!title.trim()) return;

    const res = await fetch(
      "/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          goalId,
        }),
      }
    );

    if (res.ok) {
      setTitle("");
      router.refresh();
    }
  }

  return (
    <div className="border rounded-xl p-5 mb-8">

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Project title"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={createProject}
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Create Project
      </button>

    </div>
  );
}