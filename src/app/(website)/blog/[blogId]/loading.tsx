import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
        <ArrowLeft className="mr-2 size-4" />
        Back to blog
      </Link>

      {/* Image skeleton */}
      <Skeleton className="relative w-full h-[400px] mb-8 rounded-xl mt-4" />

      {/* Title and metadata skeleton */}
      <div className="space-y-4 flex flex-col">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <Separator className="my-8" />

      {/* Body content skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <Separator className="my-8" />

      {/* Comment section skeleton */}
      <Card>
        <CardHeader className="flex items-center gap-2 border-b">
          <MessageSquare className="size-5" />
          <Skeleton className="h-6 w-32" />
        </CardHeader>

        <CardContent>
          {/* Comment form skeleton */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>

          {/* Comment list skeleton */}
          <section className="space-y-6 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="size-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
