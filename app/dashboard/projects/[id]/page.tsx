import { prisma } from "@/lib/prisma";
import ProjectTaskForm from "@/components/projects/project-task-form";
import TaskList from "@/components/dashboard/task-list";


export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const project =
    await prisma.project.findUnique({

      where: {
        id,
      },

      include: {
        tasks: true,
      },

    });

  if (!project) {

    return (
      <div>
        Project not found
      </div>
    );

  }

  return (
    <div>

      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      <div className="mt-4">

        <p className="text-sm text-gray-500 mb-2">
          {project.progress}% complete
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-black h-3 rounded-full transition-all"
            style={{
              width: `${project.progress}%`,
            }}
          />

        </div>
        {project.progress === 100 && (

  <div className="mt-4 p-3 rounded-xl bg-green-100 text-green-700">

    🎉 Project Completed!

  </div>

)}

      </div>

      <div className="mt-10">
        <ProjectTaskForm
          projectId={project.id}
        />
        <h2 className="text-xl font-bold mb-4">
          Tasks
        </h2>

        <TaskList tasks={project.tasks} />

      </div>

    </div>
  );
}