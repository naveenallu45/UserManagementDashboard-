export const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Sales',
  'Marketing',
  'Finance',
]

export const USER_STATUSES = ['Active', 'Inactive']

export const SORT_FIELDS = [
  { value: 'id', label: 'ID' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
  { value: 'department', label: 'Department' },
]

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export const DEFAULT_PAGE_SIZE = 10

export const ADMIN_USER = {
  name: 'Allu Naveen',
  role: 'System Administrator',
  initials: 'Allu',
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', active: false },
  { id: 'users', label: 'Users', active: true },
  { id: 'departments', label: 'Departments', active: false },
  { id: 'reports', label: 'Reports', active: false },
  { id: 'settings', label: 'Settings', active: false },
]
