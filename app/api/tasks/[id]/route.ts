import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { isSameDay, isYesterday } from "@/lib/streak";
import {
  updateProjectProgress,
} from "@/lib/progress";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const body = await req.json();
    const { id } = await context.params;

    console.log("PATCH HIT", id);
    console.log("BODY", body);

    const task =
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
          completed:
            body.completed,
        },
      });

    if (task.projectId) {

      await updateProjectProgress(
        task.projectId
      );

    }

    const user =
  await currentUser();

const dbUser =
  await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

if (
  body.completed === true &&
  dbUser
) {

  const today =
    new Date();

  if (!dbUser.lastActive) {

    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        streak: 1,
        lastActive: today,
      },
    });

  }

  else if (
    isSameDay(
      dbUser.lastActive,
      today
    )
  ) {

    // already counted today

  }

  else if (
    isYesterday(
      dbUser.lastActive
    )
  ) {

    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        streak:
          dbUser.streak + 1,
        lastActive: today,
      },
    });

  }

  else {

    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        streak: 1,
        lastActive: today,
      },
    });

  }

}
return NextResponse.json(task);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update task",
      },
      {
        status: 500,
      }
    );
  }
}