import { hash } from 'bcrypt'
import { prisma } from '../../src/generated/prisma-client'
import { users } from './users'
import { nros } from './data'

async function main() {
  await prisma.deleteManyUsers({ id_not: 0 }) // Delete existing users
  await Promise.all(users.map(async u => (u.password = await hash(u.password, 10)))) // Hash passwords
  await Promise.all(users.map(u => ({ ...u })).map(prisma.createUser))

  await prisma.deleteManyNroes({ id_not: 0 }) // Delete existing nros
  await Promise.all(nros.map(prisma.createNro))
}

main()
