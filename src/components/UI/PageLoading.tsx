type PageLoadingVariant =
  | "default"
  | "cards"
  | "editorial"
  | "list"
  | "schedule";

type PageLoadingProps = {
  variant?: PageLoadingVariant;
  label?: string;
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`page-loading-shimmer rounded-xl bg-base-300/70 ${className}`}
  />
);

function CardsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-base-300 bg-base-100"
        >
          <Skeleton className="h-44 rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EditorialSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 border-y border-base-300 py-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div className="space-y-4">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-14 w-3/4 sm:h-16" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <div className="grid overflow-hidden border border-base-300 md:grid-cols-2">
        <Skeleton className="min-h-64 rounded-none" />
        <div className="space-y-4 p-7">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["w-28", "w-32", "w-36", "w-24"].map((width, item) => (
          <Skeleton key={item} className={`h-10 rounded-full ${width}`} />
        ))}
      </div>
      {["w-full", "w-11/12", "w-full", "w-4/5"].map((width, item) => (
        <div
          key={item}
          className="flex items-center gap-4 rounded-xl border border-base-300 p-4"
        >
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <Skeleton className={`h-5 ${width}`} />
        </div>
      ))}
    </div>
  );
}

function ScheduleSkeleton() {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <div className="grid grid-cols-3 gap-px bg-base-300">
        {[0, 1, 2].map((item) => (
          <div key={item} className="bg-base-100 p-5">
            <Skeleton className="mx-auto h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="space-y-px bg-base-300">
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="grid grid-cols-[1fr_0.7fr_0.7fr] gap-4 bg-base-100 p-5"
          >
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageLoading({
  variant = "default",
  label = "Loading page",
}: PageLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[70vh] bg-base-100 px-4 pb-16 pt-28 text-base-content sm:px-6 lg:px-8"
    >
      <span className="sr-only">{label}</span>
      <div className="page-loading-progress" aria-hidden="true" />

      <div className="mx-auto max-w-7xl" aria-hidden="true">
        {variant !== "editorial" && (
          <div className="mb-10 flex flex-col items-center gap-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-10 w-52 sm:w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        )}

        {variant === "editorial" ? (
          <EditorialSkeleton />
        ) : variant === "list" ? (
          <ListSkeleton />
        ) : variant === "schedule" ? (
          <ScheduleSkeleton />
        ) : (
          <CardsSkeleton />
        )}
      </div>
    </div>
  );
}
