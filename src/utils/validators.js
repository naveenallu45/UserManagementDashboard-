const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email?.trim()) {
    return 'Email is required.'
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return 'Enter a valid email address.'
  }

  return null
}

export function validateUserForm(values) {
  const errors = {}

  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required.'
  }

  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required.'
  }

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  if (!values.department?.trim()) {
    errors.department = 'Department is required.'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
