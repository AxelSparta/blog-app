import { getPostById } from "@/utils/posts";

export default async function Post({ params }: { params: { postId: string } }) {
  const { postId } = await params;
  const post = await getPostById(postId);
  console.log(post);
  return <div className="flex-1">Post Page</div>;
}
