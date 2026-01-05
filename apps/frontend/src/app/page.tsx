import { Posts } from "@/components/Posts";
import { LoadingPostsGrid } from "@/components/ui/loadingPosts";
import { Suspense } from "react";
import { Toaster } from "sonner";

async function page({ searchParams }: { searchParams?: { cat?: string } }) {
  const params = await searchParams;
  return (
    <main className="flex-1">
      <Suspense fallback={<LoadingPostsGrid />}>
        <Posts category={params?.cat} />
      </Suspense>
      <Toaster />
    </main>
  );
}

export default page;
