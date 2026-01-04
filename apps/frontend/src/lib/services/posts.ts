import { config } from "@/lib/config";

const { API_URL } = config;


export async function getPostById(postId: string) {
  const response = await fetch(`${API_URL}/api/posts?idPost=${postId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch post data")
  }
  const postData = await response.json()
  return postData
}

export async function getAllPosts({ category }: { category?: string } = {}) {
  const fetchUrl = category
    ? `${API_URL}/api/posts?cat=${category}`
    : `${API_URL}/api/posts`;
    
  const response = await fetch(fetchUrl)
  if (!response.ok) {
    throw new Error("Failed to fetch posts data")
  }
  const postsData = await response.json()
  return postsData
}