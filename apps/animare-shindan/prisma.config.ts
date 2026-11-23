import nextEnv from '@next/env'
import { defineConfig } from 'prisma/config'

nextEnv.loadEnvConfig(process.cwd())

export default defineConfig({
  datasource: {
    // Migrations need a direct (non-pooled) connection.
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.ts'
  },
  schema: 'prisma/schema.prisma'
})
