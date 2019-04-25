import { verify } from 'jsonwebtoken'
import { Context } from './types'

export const APP_SECRET = 'appsecret'

export const getUserId = (context: Context) => {
  const authorization = context.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as { userId: string }
    return verifiedToken && verifiedToken.userId
  }
}
