import { useEffect, useState } from 'react'
import { DEPARTMENTS } from '../../utils/constants'

const EMPTY_FILTERS = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
}

export default function FilterModal({ isOpen, filters, onClose, onApply, onReset }) {
  const [localFilters, setLocalFilters] = useState(EMPTY_FILTERS)

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters)
    }
  }, [isOpen, filters])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (field) => (event) => {
    setLocalFilters((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleApply = () => {
    onApply(localFilters)
    onClose()
  }

  const handleReset = () => {
    setLocalFilters(EMPTY_FILTERS)
    onReset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-label="Close filter modal"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl animate-slide-up"
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="filter-modal-title" className="text-lg font-semibold text-gray-900">
            Filter Users
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Narrow down the user list with specific criteria.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <FilterField
            id="filter-firstName"
            label="First Name"
            value={localFilters.firstName}
            onChange={handleChange('firstName')}
          />
          <FilterField
            id="filter-lastName"
            label="Last Name"
            value={localFilters.lastName}
            onChange={handleChange('lastName')}
          />
          <FilterField
            id="filter-email"
            label="Email"
            type="email"
            value={localFilters.email}
            onChange={handleChange('email')}
          />
          <div>
            <label htmlFor="filter-department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              id="filter-department"
              value={localFilters.department}
              onChange={handleChange('department')}
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterField({ id, label, type = 'text', value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  )
}

export { EMPTY_FILTERS }
