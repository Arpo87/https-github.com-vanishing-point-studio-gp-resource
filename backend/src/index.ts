import { ApolloServer, gql, makeExecutableSchema, AuthenticationError } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import { sign } from 'jsonwebtoken'
import { permissions } from './permissions'
import { nros } from './data/nros'
import { users } from './data/users'
import { projectGroups } from './data/projectGroups'
import { nroProjects } from './data/nroProjects'
import { jwtSecret, getUserIdFromToken } from './utils'

const typeDefs = gql(importSchema('schema.graphql'))

const resolvers = {
  Query: {
    nros: () => nros,
    me: (_parent: any, _args: any, ctx: any) => users.find(u => u.id === getUserIdFromToken(ctx)),
    projectGroups: () => projectGroups,
    nroProjects: () => nroProjects,
  },
  Mutation: {
    login: async (_parent: any, { email, password }: any) => {
      const user = users.find(u => u.email === email && u.password === password)
      if (user) {
        return { token: sign({ userId: user.id, isAdmin: user.isAdmin }, jwtSecret), user }
      } else {
        throw new AuthenticationError('Invalid email or password')
      }
    },
  },
}

const context = async ({ req }: any) => {
  return { req }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log('Server ready at ' + url)
})
