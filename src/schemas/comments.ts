import { z } from "zod";
import type { Id } from "../../convex/_generated/dataModel";

export const commentSchema = z.object({
  postId: z.custom<Id<"posts">>(),
  body: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
});

export type TypeCommentSchema = z.infer<typeof commentSchema>;
