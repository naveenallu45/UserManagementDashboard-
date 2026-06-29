import { getFullName, getInitials } from '../../utils/helpers'

function StatusBadge({ status }) {
  const isActive = status === 'Active'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  )
}

function ActionButtons({ user, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(user)}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        aria-label={`View ${getFullName(user.firstName, user.lastName)}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onEdit(user)}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600"
        aria-label={`Edit ${getFullName(user.firstName, user.lastName)}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onDelete(user)}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete ${getFullName(user.firstName, user.lastName)}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

export default function UserRow({ user, index, onView, onEdit, onDelete }) {
  const fullName = getFullName(user.firstName, user.lastName)
  const initials = getInitials(user.firstName, user.lastName)

  return (
    <tr
      className={`transition-colors hover:bg-gray-50 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
      }`}
    >
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:px-6">
        {user.id}
      </td>
      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-900">{fullName}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-6">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-6">
        {user.department}
      </td>
      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
        <StatusBadge status={user.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-4 sm:px-6">
        <ActionButtons user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  )
}

export { StatusBadge, ActionButtons }
