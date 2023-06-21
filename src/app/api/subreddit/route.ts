import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await request.json();

    const { name } = SubredditValidator.parse(body);

    const subredditExists = await prisma.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (subredditExists) {
      return new Response("Subreddit already exists", { status: 409 });
    }

    const subreddit = await prisma.subreddit.create({
      data: {
        name,
        creatorId: currentUser.id,
      },
    });

    await prisma.subscription.create({
      data: {
        userId: currentUser.id,
        subredditId: subreddit.id,
      },
    });

    return new Response(JSON.stringify(subreddit.name), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response("Could create subreddit", {
      status: 500,
    });
  }
}
