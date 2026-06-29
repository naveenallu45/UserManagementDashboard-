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

export const USER_PROFILES = [
  { firstName: 'Venkatesh', lastName: 'Reddy', email: 'venkateshreddy@gmail.com' },
  { firstName: 'Lakshmi', lastName: 'Priya', email: 'lakshmipriya@gmail.com' },
  { firstName: 'Srinivas', lastName: 'Murthy', email: 'srinivasmurthy@gmail.com' },
  { firstName: 'Padmavathi', lastName: 'Devi', email: 'padmavathidevi@gmail.com' },
  { firstName: 'Ramesh', lastName: 'Babu', email: 'rameshbabu@gmail.com' },
  { firstName: 'Anuradha', lastName: 'Kumari', email: 'anuradhakumari@gmail.com' },
  { firstName: 'Kiran', lastName: 'Kumar', email: 'kirankumar@gmail.com' },
  { firstName: 'Swathi', lastName: 'Goud', email: 'swathigoud@gmail.com' },
  { firstName: 'Rajesh', lastName: 'Chowdary', email: 'rajeshchowdary@gmail.com' },
  { firstName: 'Divya', lastName: 'Sree', email: 'divyasree@gmail.com' },
  { firstName: 'Naveen', lastName: 'Allu', email: 'naveenallu@gmail.com' },
  { firstName: 'Harika', lastName: 'Naidu', email: 'harikanaidu@gmail.com' },
  { firstName: 'Prasad', lastName: 'Rao', email: 'prasadrao@gmail.com' },
  { firstName: 'Sindhu', lastName: 'Varma', email: 'sindhuvarma@gmail.com' },
  { firstName: 'Mahesh', lastName: 'Goud', email: 'maheshgoud@gmail.com' },
];

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
