import type { Dispatch, SetStateAction } from 'react'
import type { AuthUser } from './auth'

export interface AuthContextValue {
  user: AuthUser | null
  setUser: Dispatch<SetStateAction<AuthUser | null>>
}
