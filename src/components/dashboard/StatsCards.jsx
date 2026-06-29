import { countByDepartment, getTrendBadge } from '../../utils/helpers'

const STAT_CONFIG = [
  {
    key: 'total',
    title: 'Total Users',
    department: null,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    iconBg: 'bg-slate-100 text-slate-700',
  },
  {
    key: 'engineering',
    title: 'Engineering Users',
    department: 'Engineering',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    key: 'sales',
    title: 'Sales Users',
    department: 'Sales',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    ),
    iconBg: 'bg-green-50 text-green-600',
  },
  {
    key: 'hr',
    title: 'HR Users',
    department: 'HR',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    iconBg: 'bg-amber-50 text-amber-600',
  },
]

function StatCard({ stat, count, trend }) {
  return (
    <article className="group flex-1 min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 leading-tight">
            {stat.title}
          </p>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            {count}
          </p>
          <span
            className={`mt-2 sm:mt-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${
              trend.positive
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {trend.label} of total
          </span>
        </div>
        <div
          className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${stat.iconBg}`}
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {stat.icon}
          </svg>
        </div>
      </div>
    </article>
  )
}

export default function StatsCards({ users }) {
  const total = users.length

  const rows = [
    STAT_CONFIG.slice(0, 2),
    STAT_CONFIG.slice(2, 4),
  ]

  return (
    <div className="flex flex-col gap-3 sm:gap-4 xl:grid xl:grid-cols-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-3 sm:gap-4 xl:contents">
          {row.map((stat) => {
            const count =
              stat.department === null
                ? total
                : countByDepartment(users, stat.department)
            const trend = getTrendBadge(count, total)

            return (
              <StatCard key={stat.key} stat={stat} count={count} trend={trend} />
            )
          })}
        </div>
      ))}
    </div>
  )
}
