import type { AuthUser } from './auth'
import { useEffect, useState } from 'react'
import { AUTH_KEY, getUser } from './auth'

export const useAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null>(() => getUser())

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== AUTH_KEY) {
        return
      }

      setUser(getUser())
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return [user, setUser] as const
}
