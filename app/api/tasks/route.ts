import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";



export async function GET() {


  const user = await currentUser();


  if (!user) {

    return NextResponse.json(
      {error:"Unauthorized"},
      {status:401}
    );

  }


  const dbUser =
    await prisma.user.findUnique({
      where:{
        clerkId:user.id
      }
    });


  const tasks =
    await prisma.task.findMany({

      where:{
        userId: dbUser?.id
      },

      orderBy:{
        createdAt:"desc"
      }

    });


  return NextResponse.json(tasks);

}




export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email:
            user.emailAddresses[0]?.emailAddress ??
            "unknown@email.com",
          name: user.firstName ?? "",
          imageUrl: user.imageUrl,
        },
      });
    }

    const body = await req.json();

    console.log("DB USER:", dbUser);
    console.log("BODY:", body);

    console.log("Creating task...");

    const task = await prisma.task.create({
      data: {
        title: body.title,
        priority: body.priority ?? "MEDIUM",
        userId: dbUser.id,
      },
    });

    return NextResponse.json(task);

  } catch (error) {

    console.error("TASK API ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}