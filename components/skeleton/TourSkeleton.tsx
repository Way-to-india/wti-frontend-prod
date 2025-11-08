export default function TourSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 bg-skeleton rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-6 bg-skeleton rounded w-32 animate-pulse"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-skeleton rounded-2xl animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-video bg-skeleton rounded-xl animate-pulse"></div>
            <div className="aspect-video bg-skeleton rounded-xl animate-pulse"></div>
            <div className="aspect-video bg-skeleton rounded-xl animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-skeleton-card border border-form-input-border rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-skeleton rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-skeleton rounded w-32 animate-pulse"></div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-skeleton rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-skeleton rounded w-28 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-skeleton rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-skeleton rounded w-24 animate-pulse"></div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-skeleton rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-skeleton rounded w-36 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-skeleton rounded w-32 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-skeleton rounded-full w-20 animate-pulse"></div>
                <div className="h-8 bg-skeleton rounded-full w-24 animate-pulse"></div>
                <div className="h-8 bg-skeleton rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-skeleton rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-skeleton rounded-full w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="h-8 bg-skeleton-cta rounded w-64 mb-6 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-5 bg-skeleton rounded w-full animate-pulse"></div>
          <div className="h-5 bg-skeleton rounded w-full animate-pulse"></div>
          <div className="h-5 bg-skeleton rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}