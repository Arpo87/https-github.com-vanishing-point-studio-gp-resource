import { AuthenticationError } from 'apollo-server'
import { objectType, queryType, mutationType, stringArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { jwtSecret, getUserIdFromToken } from './utils'

const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields(['id', 'name', 'email', 'isAdmin'])
  },
})

const Nro = prismaObjectType({
  name: 'Nro',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const LoginPayload = objectType({
  name: 'LoginPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, ctx) => ctx.prisma.user({ id: getUserIdFromToken(ctx) }),
    })

    t.list.field('nros', {
      type: 'Nro',
      resolve: (_parent, _args, ctx) => ctx.prisma.nroes(),
    })
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.field('login', {
      type: 'LoginPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user({ email: email || undefined })
        if (user && (await compare(password, user.password))) {
          return { token: sign({ userId: user.id, isAdmin: user.isAdmin }, jwtSecret), user }
        } else {
          throw new AuthenticationError('Invalid email or password')
        }
      },
    })
  },
})

export const resolvers = { User, Nro, LoginPayload, Query, Mutation }
