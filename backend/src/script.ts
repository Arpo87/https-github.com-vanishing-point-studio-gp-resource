import { prisma } from './generated/prisma-client'

async function main() {
  const allUsers = await prisma.users()
  console.log(`Users: `, allUsers)

  const allNROs = await prisma.nRoes()
  console.log(`NROs: `, allNROs)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(e => console.error(e))
