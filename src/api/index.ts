import { z } from "zod"

export interface ApiErrorShape {
  status: number
  message: string
  details?: unknown
}

export interface ApiError extends Error {
  status: number
  details?: unknown
}

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
}

const createApiError = ({
  status,
  message,
  details,
}: ApiErrorShape): ApiError => {
  return Object.assign(new Error(message), { status, details })
}

const parseResponse = async <T>(response: Response, schema: z.ZodType<T>) => {
  const data = (await response.json()) as unknown
  const result = schema.safeParse(data)

  if (!result.success) {
    throw createApiError({
      status: response.status,
      message: "Response validation failed",
      details: result.error.issues,
    })
  }

  return result.data
}

export const api = {
  get: async <T>(url: string, schema: z.ZodType<T>): Promise<T> => {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
    })

    if (!response.ok) {
      const message = response.statusText || "Request failed"
      throw createApiError({ status: response.status, message })
    }

    return parseResponse(response, schema)
  },
}

export type { z }
export { getApiErrorMessage } from './errorMessages'
