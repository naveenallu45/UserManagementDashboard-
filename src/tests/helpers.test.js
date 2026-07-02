import { describe, expect, it } from 'vitest'
import {
  assignDepartment,
  assignStatus,
  filterUsers,
  getFullName,
  getInitials,
  normalizeUser,
  paginateUsers,
  sortUsers,
  splitName,
} from '../utils/helpers'

describe('splitName', () => {
  it('splits a full name into first and last name', () => {
    expect(splitName('Leanne Graham')).toEqual({
      firstName: 'Leanne',
      lastName: 'Graham',
    })
  })

  it('handles single-word names', () => {
    expect(splitName('Madonna')).toEqual({
      firstName: 'Madonna',
      lastName: '',
    })
  })

  it('handles multi-part last names', () => {
    expect(splitName('Mary Jane Watson')).toEqual({
      firstName: 'Mary',
      lastName: 'Jane Watson',
    })
  })

  it('returns empty strings for invalid input', () => {
    expect(splitName('')).toEqual({ firstName: '', lastName: '' })
    expect(splitName(null)).toEqual({ firstName: '', lastName: '' })
  })
})

describe('assignDepartment', () => {
  it('assigns a department based on user id', () => {
    expect(assignDepartment(1)).toBe('HR')
    expect(assignDepartment(2)).toBe('Sales')
  })
})

describe('normalizeUser', () => {
  it('maps JSONPlaceholder API users to the app user shape', () => {
    const apiUser = {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      username: 'Bret',
    }

    expect(normalizeUser(apiUser)).toEqual({
      id: 1,
      firstName: 'Leanne',
      lastName: 'Graham',
      email: 'Sincere@april.biz',
      department: assignDepartment(1),
      status: assignStatus(1),
    })
  })

  it('preserves locally created users with explicit fields', () => {
    const localUser = {
      id: 11,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      department: 'Finance',
      status: 'Active',
    }

    expect(normalizeUser(localUser)).toEqual(localUser)
  })
})

describe('filterUsers', () => {
  const users = [
    { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'leanne@test.com', department: 'Engineering' },
    { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'ervin@test.com', department: 'Sales' },
    { id: 3, firstName: 'Clementine', lastName: 'Bauch', email: 'clem@test.com', department: 'HR' },
  ]

  it('filters by search query case-insensitively', () => {
    const result = filterUsers(users, { search: 'ervin' })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Ervin')
  })

  it('searches across email and department', () => {
    expect(filterUsers(users, { search: 'sales' })).toHaveLength(1)
    expect(filterUsers(users, { search: '@test.com' })).toHaveLength(3)
  })

  it('applies field-specific filters', () => {
    const result = filterUsers(users, {
      filters: { department: 'HR' },
    })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Clementine')
  })

  it('combines search and filters', () => {
    const result = filterUsers(users, {
      search: 'e',
      filters: { department: 'Engineering' },
    })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Leanne')
  })
})

describe('sortUsers', () => {
  const users = [
    { firstName: 'Charlie', lastName: 'Brown', email: 'c@test.com', department: 'HR' },
    { firstName: 'Alice', lastName: 'Smith', email: 'a@test.com', department: 'Sales' },
    { firstName: 'Bob', lastName: 'Jones', email: 'b@test.com', department: 'Engineering' },
  ]

  it('sorts ascending by first name', () => {
    const sorted = sortUsers(users, 'firstName', 'asc')
    expect(sorted.map((u) => u.firstName)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('sorts descending by last name', () => {
    const sorted = sortUsers(users, 'lastName', 'desc')
    expect(sorted.map((u) => u.lastName)).toEqual(['Smith', 'Jones', 'Brown'])
  })

  it('sorts by department', () => {
    const sorted = sortUsers(users, 'department', 'asc')
    expect(sorted[0].department).toBe('Engineering')
  })

  it('sorts numerically by id', () => {
    const unsorted = [
      { id: 10, firstName: 'A', lastName: 'Z', email: 'a@test.com', department: 'HR' },
      { id: 2, firstName: 'B', lastName: 'Y', email: 'b@test.com', department: 'HR' },
      { id: 1, firstName: 'C', lastName: 'X', email: 'c@test.com', department: 'HR' },
    ]

    const sorted = sortUsers(unsorted, 'id', 'asc')
    expect(sorted.map((u) => u.id)).toEqual([1, 2, 10])
  })
})

describe('paginateUsers', () => {
  const users = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    firstName: `User${i + 1}`,
  }))

  it('returns correct page slice', () => {
    const result = paginateUsers(users, 2, 10)
    expect(result.users).toHaveLength(10)
    expect(result.users[0].id).toBe(11)
    expect(result.currentPage).toBe(2)
    expect(result.totalPages).toBe(3)
  })

  it('clamps page to valid range', () => {
    const result = paginateUsers(users, 99, 10)
    expect(result.currentPage).toBe(3)
  })
})

describe('getInitials and getFullName', () => {
  it('builds initials from names', () => {
    expect(getInitials('Leanne', 'Graham')).toBe('LG')
  })

  it('builds full name', () => {
    expect(getFullName('Leanne', 'Graham')).toBe('Leanne Graham')
  })
})
