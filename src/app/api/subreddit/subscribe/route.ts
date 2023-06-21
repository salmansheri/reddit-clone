import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json();

    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        subredditId,
        userId: currentUser.id,
      },
    });

    if (subscriptionExists) {
      return new Response("you are already subscribed", {
        status: 400,
      });
    }

    const subscription = await prisma.subscription.create({
      data: {
        subredditId,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(subscription), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response("Could not create subreddit", {
      status: 500,
    });
  }
}
