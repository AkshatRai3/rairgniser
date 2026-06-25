import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

  const user =
    await currentUser();

  if (!user) {

    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );

  }

  const dbUser =
    await prisma.user.findUnique({

      where: {
        clerkId: user.id,
      },

    });

  const body =
    await req.json();

  const task =
    await prisma.task.create({

      data: {

        title:
          body.title,

        userId:
          dbUser!.id,

        projectId:
          body.projectId,

        dueDate:
          body.dueDate
            ? new Date(body.dueDate)
            : null,


      },

    });

  return NextResponse.json(
    task
  );

}