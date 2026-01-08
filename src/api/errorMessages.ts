import type { ApiError } from './index'

export const getApiErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong while loading data.'
  }

  const apiError = error as ApiError

  if (typeof apiError.status === 'number') {
    if (apiError.status >= 500) {
      return 'Server error. Please try again.'
    }

    if (apiError.status === 404) {
      return 'Requested data was not found.'
    }

    if (apiError.status === 401 || apiError.status === 403) {
      return 'You are not authorised to access this data.'
    }
  }

  return 'Something went wrong while loading data.'
}
