import { config } from "@/lib/config";
const { API_URL } = config;

export async function getPostById(postId: string) {
  const response = await fetch(`${API_URL}/api/posts?idPost=${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }
  const postData = await response.json();
  return postData;
}

export async function getAllPosts({ category }: { category?: string } = {}) {
  const fetchUrl = category
    ? `${API_URL}/api/posts?cat=${category}`
    : `${API_URL}/api/posts`;

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch posts data");
  }
  const postsData = await response.json();
  return postsData;
}

export async function createPost(formData: FormData, token: string) {

  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to create post",
    );
  }

  return await response.json();
}

export async function getUserPosts(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/posts?userId=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to fetch user posts",
    );
  }

  return await response.json();
}

export async function updatePost(
  postId: string,
  formData: FormData,
  token: string,
) {
  const response = await fetch(`${API_URL}/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to update post",
    );
  }

  return await response.json();
}

export async function deletePost(postId: string, token: string) {
  const response = await fetch(`${API_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      typeof errorData === "string" ? errorData : "Failed to delete post",
    );
  }

  return await response.json();
}
