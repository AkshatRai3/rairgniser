"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MissionForm() {

  const [title, setTitle] =
    useState("");

  const router =
    useRouter();

  async function createMission() {

    if (!title.trim()) return;

    const res =
      await fetch(
        "/api/missions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
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
        placeholder="Mission title"
        className="border p-2 rounded w-full"
      />

      <button
        onClick={createMission}
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Create Mission
      </button>

    </div>
  );
}