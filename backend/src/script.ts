import { prisma } from './generated/prisma-client'

async function main() {
  const allUsers = await prisma.users()
  console.log(`Users: `, allUsers)

  const allNros = await prisma.nroes()
  console.log(`NROs: `, allNros)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(e => console.error(e))
