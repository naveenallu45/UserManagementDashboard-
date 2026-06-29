import { getFullName, getInitials } from '../../utils/helpers'
import { ActionButtons, StatusBadge } from './UserRow'

export default function UserCard({ user, onView, onEdit, onDelete }) {
  const fullName = getFullName(user.firstName, user.lastName)
  const initials = getInitials(user.firstName, user.lastName)

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">{fullName}</h3>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <StatusBadge status={user.status} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Department</p>
          <p className="text-sm font-medium text-gray-700">{user.department}</p>
        </div>
        <ActionButtons user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </article>
  )
}
