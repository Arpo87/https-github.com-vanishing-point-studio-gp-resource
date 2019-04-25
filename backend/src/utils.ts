import { verify } from 'jsonwebtoken'
import { Context } from './types'

export const jwtSecret = 'replaceme'

export const getUserIdFromToken = (ctx: Context) => {
  const userData = getUserDataFromToken(ctx)
  return userData && userData.userId
}

export const getUserDataFromToken = (ctx: Context) => {
  const authorization = ctx.req.headers.authorization
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    return verify(token, jwtSecret) as { userId: string; isAdmin: boolean }
  }
}
