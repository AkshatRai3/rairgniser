import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import MissionForm from "@/components/missions/mission-form";
import Link from "next/link";

export default async function MissionsPage() {

  const user =
    await currentUser();

  const dbUser =
    await prisma.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });

  const missions =
    await prisma.mission.findMany({
      where: {
        userId: dbUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Missions
      </h1>

      <MissionForm/>
      
      <div className="grid gap-4">

        {missions.map((mission) => (

          <Link
            href={`/dashboard/missions/${mission.id}`}
            key={mission.id}
          >
           <div className="border rounded-xl p-5 hover:bg-gray-50 cursor-pointer transition">
            <h2 className="font-bold text-xl">
              {mission.title}
            </h2>

            <p className="text-gray-500">
              {mission.progress}%
              complete
            </p>

            </div>
          </Link>

        ))}

      </div>

    </div>
  );
}