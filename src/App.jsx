import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import StatsCards from './components/dashboard/StatsCards'
import Toolbar from './components/dashboard/Toolbar'
import UserTable from './components/users/UserTable'
import UserFormModal, { UserViewModal } from './components/users/UserFormModal'
import DeleteConfirmationModal from './components/users/DeleteConfirmationModal'
import FilterModal, { EMPTY_FILTERS } from './components/users/FilterModal'
import Loader, { StatsSkeleton } from './components/shared/Loader'
import EmptyState from './components/shared/EmptyState'
import ErrorAlert from './components/shared/ErrorAlert'
import Pagination from './components/shared/Pagination'
import { ToastContainer, useToast } from './components/shared/Toast'
import { useUsers } from './hooks/useUsers'
import { DEFAULT_PAGE_SIZE } from './utils/constants'
import { debounce, filterUsers, paginateUsers, sortUsers } from './utils/helpers'

export default function App() {
  const { users, loading, error, reloadUsers, addUser, updateUser, deleteUser } = useUsers()
  const { toasts, showToast, dismissToast } = useToast()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [formModal, setFormModal] = useState({ open: false, mode: 'add', user: null })
  const [viewUser, setViewUser] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setDebouncedSearch(value), 300),
    [],
  )

  useEffect(() => {
    debouncedSetSearch(searchQuery)
  }, [searchQuery, debouncedSetSearch])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, filters, sortField, sortDirection, pageSize])

  const processedUsers = useMemo(() => {
    const filtered = filterUsers(users, {
      search: debouncedSearch,
      filters,
    })
    return sortUsers(filtered, sortField, sortDirection)
  }, [users, debouncedSearch, filters, sortField, sortDirection])

  const pagination = useMemo(
    () => paginateUsers(processedUsers, currentPage, pageSize),
    [processedUsers, currentPage, pageSize],
  )

  const handleClearFilters = useCallback(() => {
    setSearchQuery('')
    setDebouncedSearch('')
    setFilters(EMPTY_FILTERS)
    setCurrentPage(1)
  }, [])

  const handleFormSubmit = async (formData) => {
    const isEdit = formModal.mode === 'edit'
    const result = isEdit
      ? await updateUser(formModal.user.id, formData)
      : await addUser(formData)

    if (result.success) {
      showToast(
        isEdit ? 'User updated successfully.' : 'User added successfully.',
      )
      return { success: true }
    }

    showToast(result.message || 'Something went wrong.', 'error')
    return { success: false }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return

    setDeleting(true)
    const result = await deleteUser(deleteTarget.id)
    setDeleting(false)

    if (result.success) {
      showToast('User deleted successfully.')
      setDeleteTarget(null)
    } else {
      showToast(result.message || 'Something went wrong.', 'error')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => showToast('Logged out successfully.')}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar
          pageTitle="Users"
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <Header />

            {error ? (
              <ErrorAlert message={error} onRetry={reloadUsers} />
            ) : loading ? (
              <StatsSkeleton />
            ) : (
              <StatsCards users={users} />
            )}

            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="space-y-4 border-b border-gray-200 p-4 sm:p-6">
                <Toolbar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSortFieldChange={setSortField}
                  onSortDirectionToggle={() =>
                    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                  }
                  onFilterClick={() => setFilterModalOpen(true)}
                  onAddClick={() =>
                    setFormModal({ open: true, mode: 'add', user: null })
                  }
                />
              </div>

              {loading ? (
                <div className="p-4 sm:p-6">
                  <Loader />
                </div>
              ) : processedUsers.length === 0 ? (
                <div className="p-4 sm:p-6">
                  <EmptyState onClearFilters={handleClearFilters} />
                </div>
              ) : (
                <>
                  <UserTable
                    users={pagination.users}
                    onView={setViewUser}
                    onEdit={(user) =>
                      setFormModal({ open: true, mode: 'edit', user })
                    }
                    onDelete={setDeleteTarget}
                  />
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    pageSize={pageSize}
                    totalItems={pagination.totalItems}
                    startIndex={pagination.startIndex}
                    endIndex={pagination.endIndex}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </>
              )}
            </section>
          </div>
        </main>
      </div>

      <FilterModal
        isOpen={filterModalOpen}
        filters={filters}
        onClose={() => setFilterModalOpen(false)}
        onApply={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <UserFormModal
        isOpen={formModal.open}
        mode={formModal.mode}
        user={formModal.user}
        onClose={() => setFormModal({ open: false, mode: 'add', user: null })}
        onSubmit={handleFormSubmit}
      />

      <UserViewModal user={viewUser} onClose={() => setViewUser(null)} />

      <DeleteConfirmationModal
        user={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        deleting={deleting}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
