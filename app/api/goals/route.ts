import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

  const body =
    await req.json();

  const goal =
    await prisma.goal.create({

      data: {

        title:
          body.title,

        missionId:
          body.missionId,

      },

    });

  return NextResponse.json(
    goal
  );
}