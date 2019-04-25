import { rule, shield } from 'graphql-shield'
import { getUserDataFromToken, getUserIdFromToken } from './utils'

const rules = {
  isAuthenticated: rule()((_parent, _args, ctx) => !!getUserIdFromToken(ctx)),
  isAuthenticatedAdmin: rule()((_parent, _args, ctx) => {
    const userData = getUserDataFromToken(ctx)
    return !!userData && userData.isAdmin
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
    nros: rules.isAuthenticated,
  },
})
