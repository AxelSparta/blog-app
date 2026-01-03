import Skeleton from "./skeleton";

export function PostCardSkeleton() {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-slate-50 dark:bg-slate-950 shadow-sm">
      {/* Image area */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 h-full w-full" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Excerpt preview */}
        <div className="flex-1">
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-5/6 rounded-md mb-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none" />
    </article>
  );
}
