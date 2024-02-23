/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'dotenv/config'
import jsonWebToken from 'jsonwebtoken'

const generateAccessToken = (user: any): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_SECRET), {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null
        ? String(process.env.JWT_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: any): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

const verifyRefreshToken = (token: string): any => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SECRET))
  } catch (error) {
    return null
  }
}

const verifyAccessToken = (token: string): any => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_SECRET))
  } catch (error) {
    return null
  }
}

const parseJWT = (token: string): any => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  parseJWT
}
