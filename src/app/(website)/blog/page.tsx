import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Read our latest blog posts
        </p>
      </div>

      <Suspense fallback={<BlogSkeleton />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  const data = await fetchQuery(api.posts.getPosts);
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {data.map((post) => (
        <Card key={post._id} className="overflow-hidden py-0">
          <div className="aspect-5/3 overflow-hidden relative">
            <Image
              src={
                post.imageStorageId ??
                "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="post-image"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="pb-4 space-y-2">
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-xl font-semibold hover:underline">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3 text-sm">
              {post.body}
            </p>
          </CardContent>
          <CardFooter className="pt-0 pb-6">
            <Link
              className={buttonVariants({
                variant: "default",
                className: "w-full",
              })}
              href={`/blog/${post._id}`}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden py-0">
          <Skeleton className="aspect-5/3 w-full" />
          <CardContent className="pb-4 space-y-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="pt-0 pb-6">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
