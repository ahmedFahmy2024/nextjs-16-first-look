"use server";

import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { blogSchema, type TypeBlogSchema } from "@/schemas/blog";
import { api } from "../../convex/_generated/api";

export async function createBlogAction(data: TypeBlogSchema) {
  const parsedData = blogSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsedData.data.title,
      body: parsedData.data.content,
    },
    { token },
  );

  return redirect("/");
}
