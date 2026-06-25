import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  const body = await req.json();

  const project =
    await prisma.project.create({
      data: {
        title: body.title,
        goalId: body.goalId,
      },
    });

  return NextResponse.json(project);
}