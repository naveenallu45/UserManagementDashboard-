import { describe, expect, it } from 'vitest'
import { validateEmail, validateUserForm } from '../utils/validators'

describe('validateEmail', () => {
  it('returns error for empty email', () => {
    expect(validateEmail('')).toBe('Email is required.')
  })

  it('returns error for invalid format', () => {
    expect(validateEmail('not-an-email')).toBe('Enter a valid email address.')
  })

  it('returns null for valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull()
  })
})

describe('validateUserForm', () => {
  it('returns errors for empty form', () => {
    const result = validateUserForm({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    })

    expect(result.isValid).toBe(false)
    expect(result.errors.firstName).toBeDefined()
    expect(result.errors.lastName).toBeDefined()
    expect(result.errors.email).toBeDefined()
    expect(result.errors.department).toBeDefined()
  })

  it('passes with valid data', () => {
    const result = validateUserForm({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      department: 'Engineering',
    })

    expect(result.isValid).toBe(true)
    expect(Object.keys(result.errors)).toHaveLength(0)
  })

  it('rejects invalid email in form', () => {
    const result = validateUserForm({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'bad-email',
      department: 'Engineering',
    })

    expect(result.isValid).toBe(false)
    expect(result.errors.email).toBe('Enter a valid email address.')
  })
})
