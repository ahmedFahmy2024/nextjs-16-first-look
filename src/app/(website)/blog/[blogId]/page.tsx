import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import PostPresence from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

type Props = {
  params: Promise<{ blogId: Id<"posts"> }>;
};

export default async function BlogDetail({ params }: Props) {
  const { blogId } = await params;
  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { postId: blogId }),
    await preloadQuery(api.comments.getCommentsByPostId, {
      postId: blogId,
    }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
        <ArrowLeft className="mr-2 size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm mt-4">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
          }
          alt="post-image"
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted on: {new Date(post._creationTime).toLocaleDateString()}
          </p>
          {userId && <PostPresence roomId={post._id} userId={userId} />}
        </div>
      </div>

      <Separator className="my-8" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post.body}
      </p>

      <Separator className="my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
