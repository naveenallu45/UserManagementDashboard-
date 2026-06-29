import { useCallback, useEffect, useState } from 'react'
import {
  createUser,
  deleteUser as deleteUserRequest,
  fetchUsers,
  updateUser as updateUserRequest,
} from '../api/userService'
import { generateUserId, normalizeUser } from '../utils/helpers'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchUsers()
      setUsers(data.map(normalizeUser).sort((a, b) => a.id - b.id))
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to load users. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const addUser = useCallback(async (formData) => {
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      department: formData.department,
    }

    try {
      await createUser(payload)

      const newUser = normalizeUser({
        id: generateUserId(users),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
        status: 'Active',
      })

      setUsers((prev) => [...prev, newUser].sort((a, b) => a.id - b.id))
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          'Something went wrong.',
      }
    }
  }, [users])

  const updateUser = useCallback(async (id, formData) => {
    const payload = {
      id,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      department: formData.department,
    }

    try {
      await updateUserRequest(id, payload)

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                department: formData.department,
              }
            : user,
        ),
      )

      return { success: true }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          'Something went wrong.',
      }
    }
  }, [])

  const deleteUser = useCallback(async (id) => {
    try {
      await deleteUserRequest(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          'Something went wrong.',
      }
    }
  }, [])

  return {
    users,
    loading,
    error,
    reloadUsers: loadUsers,
    addUser,
    updateUser,
    deleteUser,
  }
}
