import { ApolloServer } from 'apollo-server'
import { queryType } from 'nexus'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import * as path from 'path'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'

const Nro = prismaObjectType({
  name: 'Nro',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const Query = queryType({
  definition(t) {
    t.list.field('nros', {
      type: 'Nro',
      resolve: (_parent, _args, ctx) => ctx.prisma.nroes(),
    })
  },
})

const schema = makePrismaSchema({
  types: [Query, Nro],
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  nonNullDefaults: {
    input: false,
    output: false,
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})

const server = new ApolloServer({ schema, context: { prisma } })

server.listen({ port: 4000 }, () => console.log('Server ready at http://localhost:4000'))
