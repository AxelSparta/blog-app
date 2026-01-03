import { Posts } from "@/components/Posts";
import { LoadingPostsGrid } from "@/components/ui/loadingPosts";
import { Suspense } from "react";

function page() {
  return (
    <main className="flex-1">
      <Suspense fallback={<LoadingPostsGrid />}>
        <Posts />
      </Suspense>
    </main>
  );
}

export default page;
