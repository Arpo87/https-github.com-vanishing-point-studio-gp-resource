import { verify } from 'jsonwebtoken'

export const jwtSecret = 'replaceme'

export const getUserIdFromToken = (ctx: any) => {
  const userData = getUserDataFromToken(ctx)
  return userData && userData.userId
}

export const getUserDataFromToken = (ctx: any) => {
  const authorization = ctx.req.headers.authorization
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    return verify(token, jwtSecret) as { userId: string; isAdmin: boolean }
  }
}
