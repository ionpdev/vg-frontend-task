export interface AuthUser {
  username: string
}

export const AUTH_KEY = 'vg-auth-user'

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

export const login = (username: string, password: string): AuthUser | null => {
  if (username.trim().length === 0 || password.trim().length === 0) {
    return null
  }

  if (username !== password) {
    return null
  }

  const user: AuthUser = { username }
  const storage = getStorage()

  storage?.setItem(AUTH_KEY, JSON.stringify(user))

  return user
}

export const logout = (): void => {
  const storage = getStorage()

  storage?.removeItem(AUTH_KEY)
}

export const getUser = (): AuthUser | null => {
  const storage = getStorage()
  const raw = storage?.getItem(AUTH_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as AuthUser

    if (typeof parsed?.username !== 'string') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export const isAuthed = (): boolean => {
  return getUser() !== null
}
