import { config } from "@/lib/config";

import { type Post } from "../types/Post";
import { PostCard } from "./PostCard";

export async function Posts({
  category
}: {
  category?: string;
}) {
  const fetchUrl = category
    ? `${config.apiUrl}/api/posts?cat=${category}`
    : `${config.apiUrl}/api/posts`;

  const response = await fetch(fetchUrl, { cache: "no-store" });
  if (!response.ok) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-muted-foreground">Failed to load posts.</p>
      </div>
    );
  }

  const posts: Post[] = await response.json();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}
