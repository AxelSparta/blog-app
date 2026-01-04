import { type Post } from "../types/Post";
import { PostCard } from "./PostCard";
import { getAllPosts } from "@/lib/services/posts";

export async function Posts({
  category
}: {
  category?: string;
}) {
  const posts: Post[] = await getAllPosts({ category });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.length === 0 && (
        <p className="text-center col-span-full">No posts available.</p>
      )}
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}
