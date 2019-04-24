import { prisma } from '../../src/generated/prisma-client'
import { users } from './users'
import { nros } from './nros'

async function main() {
  await prisma.deleteManyUsers({ id_not: 0 }) // Delete all users
  await Promise.all(users.map(prisma.createUser))

  await prisma.deleteManyNRoes({ id_not: 0 }) // Delete all nros
  await Promise.all(nros.map(prisma.createNRO))
}

main()
