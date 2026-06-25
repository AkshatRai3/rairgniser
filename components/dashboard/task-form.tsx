"use client";


import {useState} from "react";


export default function TaskForm(){


const [title,setTitle]=useState("");



async function createTask() {

  console.log("Create Task pressed");

  try {

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title
      })
    });

    console.log("Status:", res.status);

    const data = await res.json();

    console.log("Response:", data);

    setTitle("");

  } catch (err) {

    console.error("ERROR:", err);

  }
  window.location.reload();
}



return (

<div className="border rounded-xl p-5">


<input

className="border p-2 rounded w-full"

placeholder="Add new task"

value={title}

onChange={
(e)=>setTitle(e.target.value)
}

/>


<button

onClick={createTask}

className="mt-3 bg-black text-white px-4 py-2 rounded"

>

Create Task

</button>


</div>

)

}