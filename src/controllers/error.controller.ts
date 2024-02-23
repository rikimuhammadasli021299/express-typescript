import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/winston'
import { verifyAccessToken } from '../utils/jwt'

export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message.split('-')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal server error',
    data: null
  })
}

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: 'Halaman tidak ditemukan',
    message: 'Halaman tidak ditemukan',
    data: null
  })
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Tidak dapat akses',
      data: null
    })
  }

  const user = verifyAccessToken(String(token))
  if (user === null) {
    return res.status(401).json({
      error: 'Token tidak valid',
      message: 'Verifikasi token gagal',
      data: null
    })
  }

  next()
}
