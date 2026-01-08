import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tanstackRouter from "@tanstack/router-plugin/vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
  test: {
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
  },
  plugins: [
    tailwindcss(),
    react(),
    tanstackRouter({
      routesDirectory: "./routes",
      generatedRouteTree: "./routeTree.gen.ts",
      routeFileIgnorePattern: "__tests__",
    }),
  ],
})
