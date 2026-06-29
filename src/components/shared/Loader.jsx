export default function Loader() {
  return (
    <div className="space-y-3" aria-label="Loading users" role="status">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="h-3 w-1/3 rounded bg-gray-100" />
          </div>
          <div className="hidden sm:block h-4 w-24 rounded bg-gray-100" />
          <div className="hidden md:block h-4 w-20 rounded bg-gray-100" />
          <div className="hidden lg:flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-100" />
            <div className="h-8 w-8 rounded-lg bg-gray-100" />
            <div className="h-8 w-8 rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  const rows = [2, 2]

  return (
    <div className="flex flex-col gap-3 sm:gap-4 xl:grid xl:grid-cols-4">
      {rows.map((count, rowIndex) => (
        <div key={rowIndex} className="flex gap-3 sm:gap-4 xl:contents">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-8 w-10 rounded bg-gray-200" />
                  <div className="h-5 w-12 rounded-full bg-gray-100" />
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
