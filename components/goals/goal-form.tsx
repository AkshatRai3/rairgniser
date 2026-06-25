"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalForm({
  missionId,
}: {
  missionId: string;
}) {
  const [title, setTitle] =
    useState("");

  const router =
    useRouter();

  async function createGoal() {
    if (!title.trim()) return;

    const res =
      await fetch(
        "/api/goals",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            missionId,
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
          setTitle(
            e.target.value
          )
        }
        placeholder="Goal title"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={createGoal}
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Create Goal
      </button>

    </div>
  );
}