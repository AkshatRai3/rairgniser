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

  const mission =
    await prisma.mission.create({

      data: {

        title:
          body.title,

        userId:
          dbUser!.id,

      },

    });

  return NextResponse.json(
    mission
  );

}