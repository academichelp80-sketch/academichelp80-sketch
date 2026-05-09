export function ServiceCardSkeleton() {
  return (
    <div className="p-6 bg-white/60 border border-[var(--border-light)] rounded-xl animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-[var(--border-light)] mb-5" />
      <div className="h-5 bg-[var(--border-light)] rounded w-3/4 mb-3" />
      <div className="h-3 bg-[var(--border-light)] rounded w-full mb-2" />
      <div className="h-3 bg-[var(--border-light)] rounded w-2/3" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/2] rounded-xl bg-[var(--border-light)] mb-5" />
      <div className="flex gap-2 mb-3">
        <div className="h-4 bg-[var(--border-light)] rounded w-16" />
        <div className="h-4 bg-[var(--border-light)] rounded w-12" />
      </div>
      <div className="h-5 bg-[var(--border-light)] rounded w-4/5 mb-2" />
      <div className="h-3 bg-[var(--border-light)] rounded w-full mb-1" />
      <div className="h-3 bg-[var(--border-light)] rounded w-2/3" />
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="p-6 bg-white/60 border border-[var(--border-light)] rounded-xl animate-pulse flex flex-col">
      <div className="w-8 h-8 rounded bg-[var(--border-light)] mb-4" />
      <div className="h-3 bg-[var(--border-light)] rounded w-full mb-2 flex-1" />
      <div className="h-3 bg-[var(--border-light)] rounded w-4/5 mb-4" />
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-3.5 h-3.5 rounded-full bg-[var(--border-light)]" />
        ))}
      </div>
      <div className="pt-4 border-t border-[var(--border-light)]">
        <div className="h-4 bg-[var(--border-light)] rounded w-2/3 mb-1" />
        <div className="h-3 bg-[var(--border-light)] rounded w-1/2" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="text-center space-y-3 animate-pulse">
          <div className="w-6 h-6 mx-auto rounded bg-[var(--border-light)]" />
          <div className="h-10 bg-[var(--border-light)] rounded w-24 mx-auto" />
          <div className="h-3 bg-[var(--border-light)] rounded w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-[3px] border-[var(--accent-teal)]/20 border-t-[var(--accent-teal)] rounded-full animate-spin" />
      <p className="text-sm text-[var(--text-grey)] animate-pulse">Loading...</p>
    </div>
  );
}
