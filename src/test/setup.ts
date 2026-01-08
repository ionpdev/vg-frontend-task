import { afterAll, afterEach, beforeAll, beforeEach } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { setupServer } from "msw/node"
import { handlers } from "../mocks/msw/handlers"

const createStorage = () => {
  const store = new Map<string, string>()

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
  }
}

const server = setupServer(...handlers)
let storageFallback: ReturnType<typeof createStorage> | null = null

const getStorage = () => {
  if (typeof window === "undefined") {
    return storageFallback
  }

  if (window.localStorage && typeof window.localStorage.setItem === "function") {
    return window.localStorage
  }

  if (!storageFallback) {
    storageFallback = createStorage()
  }

  Object.defineProperty(window, "localStorage", {
    value: storageFallback,
    configurable: true,
    writable: true,
  })

  return storageFallback
}

beforeAll(() => {
  getStorage()
  server.listen()
})

beforeEach(() => {
  const storage = getStorage()

  if (storage && typeof storage.clear === "function") {
    storage.clear()
  }
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
