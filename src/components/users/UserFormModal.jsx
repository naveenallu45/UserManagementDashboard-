import { useEffect, useState } from 'react'
import { DEPARTMENTS } from '../../utils/constants'
import { validateUserForm } from '../../utils/validators'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
}

function useModalKeyboard(onClose) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])
}

export default function UserFormModal({ isOpen, mode, user, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useModalKeyboard(onClose)

  useEffect(() => {
    if (!isOpen) return

    if (mode === 'edit' && user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department,
      })
    } else {
      setForm(EMPTY_FORM)
    }

    setErrors({})
  }, [isOpen, mode, user])

  if (!isOpen) return null

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validation = validateUserForm(form)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setSubmitting(true)
    const result = await onSubmit(form)
    setSubmitting(false)

    if (result?.success !== false) {
      onClose()
    }
  }

  const title = mode === 'edit' ? 'Edit User' : 'Add User'
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add User'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl animate-slide-up"
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="user-form-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {mode === 'edit'
              ? 'Update user details below.'
              : 'Fill in the details to create a new user.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <Field
            id="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
          />
          <Field
            id="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              id="department"
              value={form.department}
              onChange={handleChange('department')}
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1.5 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ id, label, type = 'text', value, onChange, error }) {
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
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export function UserViewModal({ user, onClose }) {
  useModalKeyboard(onClose)

  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-user-title"
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl animate-slide-up"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 id="view-user-title" className="text-lg font-semibold text-gray-900">
            User Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <dl className="space-y-4 px-6 py-5">
          {[
            ['ID', user.id],
            ['First Name', user.firstName],
            ['Last Name', user.lastName],
            ['Email', user.email],
            ['Department', user.department],
            ['Status', user.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
              <dd className="mt-1 text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
