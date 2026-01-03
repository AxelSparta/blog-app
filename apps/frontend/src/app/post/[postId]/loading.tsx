import Skeleton from "@/components/ui/skeleton";

export default function LoadingPostPage() {
  return (
    <main className="w-full max-w-3xl mx-auto p-6">
      {/* Header */}
      <header className="mb-6 space-y-3">
        {/* Title */}
        <Skeleton className="h-9 w-3/4" />

        {/* Category + Date */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </header>

      {/* Image */}
      <section className="mb-6">
        <Skeleton className="h-64 w-full rounded-md" />
      </section>

      {/* Content */}
      <article className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </article>
    </main>
  );
}
