import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { makePrismaSchema } from 'nexus-prisma'
import { join } from 'path'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'
import { resolvers as allTypes } from './resolvers'
import { permissions } from './permissions'

const schema = makePrismaSchema({
  types: allTypes,
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: join(__dirname, './generated/schema.graphql'),
    typegen: join(__dirname, './generated/nexus.ts'),
  },
  nonNullDefaults: {
    input: false,
    output: false,
  },
  typegenAutoConfig: {
    sources: [
      {
        source: join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: request => ({ prisma, ...request }),
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log('Server ready at ' + url)
})
