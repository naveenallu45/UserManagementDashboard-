import UserCard from './UserCard'
import UserRow from './UserRow'

export default function UserTable({ users, onView, onEdit, onDelete }) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[min(70vh,calc(100vh-20rem))] overscroll-contain">
        <table className="min-w-[720px] w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50 shadow-[0_1px_0_0_rgb(229_231_235)]">
            <tr>
              {['ID', 'User', 'Email', 'Department', 'Status', 'Actions'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  )
}
