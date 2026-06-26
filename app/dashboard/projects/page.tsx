import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {

  const projects =
    await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      {projects.map((project : any) => (

        <div
          key={project.id}
          className="border rounded-xl p-4 mt-3"
        >
          {project.title}
        </div>

      ))}

    </div>
  );
}