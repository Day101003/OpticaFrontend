import jwt_decode from 'jwt-decode'
import { getToken } from './auth'

export function getUserData() {
  const token = getToken()
  if (!token) return null

  try {
    return jwt_decode(token)
  } catch (e) {
    return null
  }
}
