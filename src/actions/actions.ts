"use server";

import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { blogSchema, type TypeBlogSchema } from "@/schemas/blog";
import { api } from "../../convex/_generated/api";

export async function createBlogAction(data: TypeBlogSchema) {
  try {
    const parsedData = blogSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const token = await getToken();

    // Step 1: Get a short-lived upload URL
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token },
    );

    // Step 2: POST the file to the URL
    const result = await fetch(imageUrl, {
      method: "POST",
      headers: { "Content-Type": parsedData.data.image.type },
      body: parsedData.data.image,
    });

    if (!result.ok) {
      return {
        error: "Failed to upload image",
      };
    }
    const { storageId } = await result.json();

    // Step 3: Save the newly allocated storage id to the database
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsedData.data.title,
        body: parsedData.data.content,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  return redirect("/");
}
