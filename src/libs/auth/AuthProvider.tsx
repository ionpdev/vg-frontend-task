import type { FC, ReactNode } from 'react'
import { AuthContext } from './authContext'
import { useAuthUser } from './useAuthUser'
import type { AuthContextValue } from './authTypes'

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useAuthUser()
  const value: AuthContextValue = { user, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
