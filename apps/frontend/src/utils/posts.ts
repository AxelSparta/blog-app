export async function getPostById(postId: string) {
  const response = await fetch(`http://localhost:4001/api/posts?idPost=${postId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch post data")
  }
  const postData = await response.json()
  return postData
}