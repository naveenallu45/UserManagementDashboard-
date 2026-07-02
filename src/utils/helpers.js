import { DEPARTMENTS } from './constants'

export function splitName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: '', lastName: '' }
  }

  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] || ''
  const lastName = parts.slice(1).join(' ') || ''

  return { firstName, lastName }
}

export function assignDepartment(userId) {
  const index = Math.abs(Number(userId) || 0) % DEPARTMENTS.length
  return DEPARTMENTS[index]
}

export function getInitials(firstName, lastName) {
  const first = firstName?.charAt(0)?.toUpperCase() || ''
  const last = lastName?.charAt(0)?.toUpperCase() || ''
  return `${first}${last}` || '?'
}

export function getFullName(firstName, lastName) {
  return [firstName, lastName].filter(Boolean).join(' ')
}

export function assignStatus(userId) {
  return Number(userId) % 3 === 0 ? 'Inactive' : 'Active'
}

export function normalizeUser(rawUser) {
  const hasSplitNames = rawUser.firstName && rawUser.lastName
  const { firstName, lastName } = hasSplitNames
    ? { firstName: rawUser.firstName, lastName: rawUser.lastName }
    : splitName(rawUser.name)

  return {
    id: rawUser.id,
    firstName,
    lastName,
    email: rawUser.email ?? '',
    department: rawUser.department ?? assignDepartment(rawUser.id),
    status: rawUser.status ?? assignStatus(rawUser.id),
  }
}

export function filterUsers(users, { search = '', filters = {} } = {}) {
  const query = search.trim().toLowerCase()

  return users.filter((user) => {
    const matchesSearch =
      !query ||
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)

    const matchesFirstName =
      !filters.firstName ||
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())

    const matchesLastName =
      !filters.lastName ||
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())

    const matchesEmail =
      !filters.email ||
      user.email.toLowerCase().includes(filters.email.toLowerCase())

    const matchesDepartment =
      !filters.department ||
      user.department.toLowerCase() === filters.department.toLowerCase()

    return (
      matchesSearch &&
      matchesFirstName &&
      matchesLastName &&
      matchesEmail &&
      matchesDepartment
    )
  })
}

export function sortUsers(users, sortField, sortDirection) {
  const sorted = [...users]
  const direction = sortDirection === 'asc' ? 1 : -1

  sorted.sort((a, b) => {
    let comparison = 0

    if (sortField === 'id') {
      comparison = Number(a.id) - Number(b.id)
    } else {
      const valueA = String(a[sortField] ?? '').toLowerCase()
      const valueB = String(b[sortField] ?? '').toLowerCase()
      comparison = valueA.localeCompare(valueB)
    }

    if (comparison === 0) {
      comparison = Number(a.id) - Number(b.id)
    }

    return comparison * direction
  })

  return sorted
}

export function paginateUsers(users, page, pageSize) {
  const totalItems = users.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    users: users.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage: safePage,
    startIndex: totalItems === 0 ? 0 : startIndex + 1,
    endIndex: Math.min(endIndex, totalItems),
  }
}

export function countByDepartment(users, department) {
  return users.filter((user) => user.department === department).length
}

export function getTrendBadge(count, total) {
  if (total === 0) return { label: '0%', positive: true }

  const percentage = Math.round((count / total) * 100)
  return {
    label: `${percentage}%`,
    positive: percentage >= 20,
  }
}

export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function generateUserId(users) {
  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0)
  return maxId + 1
}
