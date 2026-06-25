import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {


  const payload = await req.json();

  const headerPayload = await headers();


  const svixHeaders = {

    "svix-id":
      headerPayload.get("svix-id")!,

    "svix-timestamp":
      headerPayload.get("svix-timestamp")!,

    "svix-signature":
      headerPayload.get("svix-signature")!

  };


  const wh = new Webhook(
    process.env.CLERK_WEBHOOK_SECRET!
  );


  let event : any;


  try {

    event = wh.verify(
      JSON.stringify(payload),
      svixHeaders
    );

  } catch(err){

    return new Response(
      "Invalid webhook",
      {status:400}
    );

  }


  if(event.type === "user.created") {


    const user =
      event.data;


    await prisma.user.create({

      data: {

        clerkId: user.id,

        email:
          user.email_addresses[0]
          .email_address,

        name:
          user.first_name,

        imageUrl:
          user.image_url

      }

    });

  }


  return new Response("OK");

}