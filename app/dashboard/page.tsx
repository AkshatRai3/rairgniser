import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import TaskForm from "@/components/dashboard/task-form";
import TaskList from "@/components/dashboard/task-list";
import StatsCard from "@/components/dashboard/stats-card";
import WeeklyChart from "@/components/dashboard/weekly-chart";
import ProgressRing from "@/components/dashboard/progress-ring";
import Link from "next/link";
import SignInPage from "@/app/sign-in/[[...sign-in]]/page"

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    return <SignInPage />

  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  

  const tasks = await prisma.task.findMany({
    where: {
      userId: dbUser?.id,
    },
    include: {
    project: true,
  },
    orderBy: {
      createdAt: "desc",
    },
  });

  const today = new Date();

today.setHours(
  0,
  0,
  0,
  0
);

const overdueTasks =
  tasks.filter(
    (task:any) =>
      task.dueDate &&
      !task.completed &&
      new Date(task.dueDate) <
        today
  );

const dueTodayTasks =
  tasks.filter(
    (task:any) => {

      if (
        !task.dueDate ||
        task.completed
      ) return false;

      const due =
        new Date(
          task.dueDate
        );

      return (
        due.toDateString() ===
        today.toDateString()
      );

    }
  );

const upcomingTasks =
  tasks.filter(
    (task:any) => {

      if (
        !task.dueDate ||
        task.completed
      ) return false;

      return (
        new Date(
          task.dueDate
        ) > today
      );

    }
  );

  const completed = tasks.filter(
    (task:any) => task.completed
  ).length;

  const percentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completed / tasks.length) * 100
        );
  const missions = await prisma.mission.findMany({
    where: {
      userId: dbUser?.id,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Welcome {user.firstName}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <div className="border rounded-2xl p-6">
            <ProgressRing
              progress={percentage}
            />
          </div>

          <StatsCard
            title="Current Streak"
            value={`${dbUser?.streak ?? 0} Days`}
          />

          <StatsCard
            title="Completed Tasks"
            value={completed}
          />

      </div>

      <div className="mt-8">
          <WeeklyChart />
          <div className="mt-10">

  <h2 className="text-xl font-bold mb-4">

    Action Center

  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold mb-3">

        ⚠️ Overdue

      </h3>

      {overdueTasks.length === 0
        ? "No overdue tasks"
        : overdueTasks.map(
            (task : any) => (

              <Link
  key={task.id}
  href={`/dashboard/projects/${task.projectId}`}
  className="block text-sm mb-2 hover:underline"
>
  {task.title}
</Link>

            )
          )}

    </div>

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold mb-3">

        🔥 Due Today

      </h3>

      {dueTodayTasks.length === 0
        ? "Nothing due today"
        : dueTodayTasks.map(
            (task : any) => (

              <Link
  key={task.id}
  href={`/dashboard/projects/${task.projectId}`}
  className="block text-sm mb-2 hover:underline"
>
  {task.title}
</Link>

            )
          )}

    </div>

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold mb-3">

        📅 Upcoming

      </h3>

      {upcomingTasks.length === 0
        ? "No upcoming tasks"
        : upcomingTasks
            .slice(0, 5)
            .map(
              (task : any) => (

                <Link
  key={task.id}
  href={`/dashboard/projects/${task.projectId}`}
  className="block text-sm mb-2 hover:underline"
>
  {task.title}
</Link>

              )
            )}

    </div>

  </div>

</div>
      </div>

      <div className="mt-10">

  <h2 className="text-xl font-semibold mb-4">
    Active Missions
  </h2>

  <div className="grid gap-3">

    {missions.map((mission : any) => (

  <Link
    key={mission.id}
    href={`/dashboard/missions/${mission.id}`}
  >

    <div className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition">

      <div className="flex justify-between">

        <span>
          {mission.title}
        </span>

        <span>
          {mission.progress}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">

        <div
          className="bg-black h-2 rounded-full"
          style={{
            width: `${mission.progress}%`,
          }}
        />

      </div>

    </div>

  </Link>

))}

  </div>

</div>

      <div className="mt-10">
        <TaskForm />
      </div>

      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Your Tasks
        </h2>

        <TaskList tasks={tasks} />

      </div>

    </div>
  );
}