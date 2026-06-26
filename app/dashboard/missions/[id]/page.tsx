import { prisma } from "@/lib/prisma";
import GoalForm from "@/components/goals/goal-form";
import Link from "next/link";


export default async function MissionPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const mission =
    await prisma.mission.findUnique({

      where: {
        id,
      },

      include: {
        goals: true,
      },

    });

  if (!mission) {

    return (
      <div>
        Mission not found
      </div>
    );

  }

  return (
    <div>

      <h1 className="text-3xl font-bold">
        {mission.title}
      </h1>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

 <div className="mt-4">

  <p className="text-sm text-gray-500 mb-2">
    {mission.progress}% complete
  </p>

  <div className="w-full bg-gray-200 rounded-full h-3">

    <div
      className="bg-black h-3 rounded-full transition-all"
      style={{
        width: `${mission.progress}%`,
      }}
    />
    {mission.progress === 100 && (

  <div className="mt-4 p-3 rounded-xl bg-green-100 text-green-700">

    🚀 Mission Accomplished!

  </div>

)}

  </div>

</div>

</div>
      

      <div className="mt-10">

        <GoalForm
  missionId={mission.id}
/>

        <h2 className="text-xl font-bold mb-4">
          Goals
        </h2>

        {mission.goals.map(
          (goal : any) => (

            <Link
              href={`/dashboard/goals/${goal.id}`}
              key={goal.id}
            >
              <div className="border rounded-xl p-4 mt-3 hover:bg-gray-50 cursor-pointer transition">
                {goal.title}
              </div>
            </Link>

          )
        )}

      </div>

    </div>
  );
}