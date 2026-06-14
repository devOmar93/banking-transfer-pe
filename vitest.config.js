import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      clean: false,
      reporter: ['text', 'html'], // 👈 CLAVE
      reportsDirectory: './coverage', // 👈 opcional pero recomendado
    }
  }
})