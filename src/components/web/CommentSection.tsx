"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { Loader2, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { commentSchema, type TypeCommentSchema } from "@/schemas/comments";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface Props {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}

export function CommentSection({ preloadedComments }: Props) {
  const { blogId } = useParams<{ blogId: Id<"posts"> }>();

  const comments = usePreloadedQuery(preloadedComments);

  const createComment = useMutation(api.comments.createComment);

  console.log(comments);

  const form = useForm<TypeCommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: blogId,
    },
  });

  async function onSubmit(data: TypeCommentSchema) {
    try {
      createComment(data);
      form.reset();
      toast.success("Comment created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create comment");
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">
          {comments ? comments.length : 0} Comments
        </h2>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="form-create"
          className="space-y-4"
        >
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-body">Body</FieldLabel>
                <Textarea
                  {...field}
                  id="form-body"
                  aria-invalid={fieldState.invalid}
                  placeholder="Write your comment here"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="form-create"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Commenting...
              </>
            ) : (
              "Comment"
            )}
          </Button>
        </form>

        <section className="space-y-6 mt-6">
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar className="siz-10 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1 ">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {comment.authorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(comment._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-foreground/90 text-sm whitespace-pre-wrap">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
        </section>
      </CardContent>
    </Card>
  );
}
