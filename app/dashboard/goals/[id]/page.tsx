import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProjectForm from "@/components/projects/project-form";
import { Project } from "@prisma/client";

export default async function GoalPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const goal =
    await prisma.goal.findUnique({

      where: {
        id,
      },

      include: {
        projects: true,
      },

    });

  if (!goal) {

    return (
      <div>
        Goal not found
      </div>
    );

  }

  return (
    <div>

      <h1 className="text-3xl font-bold">
        {goal.title}
      </h1>

      <div className="mt-4">

        <div className="mt-4">

  <div className="flex justify-between mb-2">

    <span className="text-gray-600">
      Progress
    </span>

    <span className="font-medium">
      {goal.progress}%
    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">

    <div
      className="bg-black h-3 rounded-full transition-all duration-500"
      style={{
        width: `${goal.progress}%`,
      }}
    />

  </div>

</div>

<p className="text-sm text-gray-500 mt-2">
  {goal.projects.length} Projects
</p>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-black h-3 rounded-full transition-all"
            style={{
              width: `${goal.progress}%`,
            }}
          />

      </div>

</div>

      <div className="mt-10">

        <ProjectForm
          goalId={goal.id}
        />

        <h2 className="text-xl font-bold">
          Projects
        </h2>

        <h2 className="text-xl font-bold">
          Projects
        </h2>

        {goal.projects.map(
          (project: Project) => (

            <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            >
              <div className="border rounded-xl p-4 mt-3 hover:bg-gray-50 cursor-pointer transition">
                <div>

  <div className="flex justify-between">

    <span>
      {project.title}
    </span>

    <span>
      {project.progress}%
    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">

    <div
      className="bg-black h-2 rounded-full"
      style={{
        width: `${project.progress}%`,
      }}
    />

  </div>

</div>
              </div>
            </Link>

          )
        )}

      </div>

    </div>
  );
}