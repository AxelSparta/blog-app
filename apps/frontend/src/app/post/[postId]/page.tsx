import { getPostById } from "@/lib/services/posts";
import Image from "next/image";
import { Post as PostType } from "@/types/Post";
import { sanitize } from "@repo/validations";

export default async function Post({ params }: { params: { postId: string } }) {
  const { postId } = await params;
  const post: PostType | null = await getPostById(postId);
  const sanitizedHtml = sanitize(post?.content!);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-semibold">Post not found</h2>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="w-full max-w-3xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
            {post.category}
          </span>
          <time dateTime={post.createdAt}>{formattedDate}</time>
        </div>
      </header>

      <section className="mb-6">
        <div className="w-full rounded-md overflow-hidden bg-muted">
          {post.image?.url ? (
            // Using fixed height to keep layout stable on server render
            <div className="relative h-64 w-full">
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 800px"
              />
            </div>
          ) : (
            <div className="h-64 w-full flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300">
              <span className="text-sm text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      </section>

      <article className="prose prose-sm sm:prose-base dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
      </article>
    </main>
  );
}
