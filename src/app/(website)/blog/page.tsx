"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";

export default function BlogPage() {
  const data = useQuery(api.posts.getPosts);

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

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {data.map((post) => (
            <Card key={post._id} className="overflow-hidden py-0">
              <div className="aspect-5/3 overflow-hidden relative">
                <Image
                  src={
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
      )}
    </div>
  );
}
