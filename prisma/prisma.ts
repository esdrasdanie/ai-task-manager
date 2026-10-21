import { PrismaClient } from '../app/generated/prisma/client.ts'

declare global {
  var prismaClient: PrismaClient
}

globalThis.prismaClient ??= new PrismaClient()

const prisma = globalThis.prismaClient

export default prisma
