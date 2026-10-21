import { PrismaClient } from '../app/generated/prisma/client.ts'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

declare global {
  var prismaClient: PrismaClient
}

function createPrismaClient() {
  // Em produção usa Turso (libsql remoto), em dev usa SQLite local via DATABASE_URL
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    const adapter = new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    return new PrismaClient({ adapter })
  }

  return new PrismaClient()
}

globalThis.prismaClient ??= createPrismaClient()

const prisma = globalThis.prismaClient

export default prisma
