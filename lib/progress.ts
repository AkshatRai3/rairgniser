import { prisma } from "@/lib/prisma";

export async function updateProjectProgress(
  projectId: string
) {

  const project =
    await prisma.project.findUnique({

      where: {
        id: projectId,
      },

      include: {
        tasks: true,
      },

    });

  if (!project) return;

  const completed =
    project.tasks.filter(
      (task:any) => task.completed
    ).length;

  const progress =
    project.tasks.length === 0
      ? 0
      : Math.round(
          (completed /
            project.tasks.length) *
            100
        );

  await prisma.project.update({

    where: {
      id: projectId,
    },

    data: {
      progress,
    },

  });

  await updateGoalProgress(
    project.goalId
  );
}

export async function updateGoalProgress(
  goalId: string
) {

  const goal =
    await prisma.goal.findUnique({

      where: {
        id: goalId,
      },

      include: {
        projects: true,
      },

    });

  if (!goal) return;

  const total =
    goal.projects.reduce(
      (sum, project) =>
        sum + project.progress,
      0
    );

  const progress =
    goal.projects.length === 0
      ? 0
      : Math.round(
          total /
          goal.projects.length
        );

  await prisma.goal.update({

    where: {
      id: goalId,
    },

    data: {
      progress,
    },

  });

  await updateMissionProgress(
    goal.missionId
  );
}

export async function updateMissionProgress(
  missionId: string
) {

  const mission =
    await prisma.mission.findUnique({

      where: {
        id: missionId,
      },

      include: {
        goals: true,
      },

    });

  if (!mission) return;

  const total =
    mission.goals.reduce(
      (sum, goal) =>
        sum + goal.progress,
      0
    );

  const progress =
    mission.goals.length === 0
      ? 0
      : Math.round(
          total /
          mission.goals.length
        );

  await prisma.mission.update({

    where: {
      id: missionId,
    },

    data: {
      progress,
    },

  });

}