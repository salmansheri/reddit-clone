import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import SubscribeLeaveToggle from "./components/SubscribeLeaveToggle";

export default async function RedditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const currentUser = await getCurrentUser();

  const subreddit = await prisma.subreddit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !currentUser?.email
    ? undefined
    : await prisma.subscription.findFirst({
        where: {
          subreddit: {
            name: params.slug,
          },
          user: {
            id: currentUser.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await prisma.subscription.count({
    where: {
      subreddit: {
        name: params.slug,
      },
    },
  });
  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/* TODO: Button to remove */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>

          {/* Info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/ {subreddit.name}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dt className="text-gray-700">
                  <time dateTime={subreddit?.createdAt?.toDateString()}>
                    {format(subreddit.createdAt, "MMMM d, yyyy")}
                  </time>
                </dt>
              </div>

              <div className="flex justify-between gap-x-4">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>

              {subreddit?.creatorId === currentUser?.id && (
                <div className="flex justify-between gap-x-4 py-3">
                    <p className="text-gray-500">Your created this community</p>
                </div>
                
              ) }

              {subreddit?.creatorId === currentUser?.id && (
                <SubscribeLeaveToggle 
                    isSubscribed={isSubscribed}
                    subredditName={subreddit?.name}
                    subredditId={subreddit?.id}
                    />
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
