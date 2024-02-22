/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextFunction, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import { getBarang } from '../services/barang.service'

export const getAllBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await getBarang()
    return res.status(200).json({
      error: null,
      message: 'Pengambilan semua data berhasi',
      data
    })
  } catch (error: Error | any) {
    next(
      new Error(
        `Error pad file src/controllers/barang.controller.ts : ${error.message}`
      )
    )
  }
}

export const insertBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { error, value } = inputBarangValidation(req.body)
  try {
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }

    return res.status(200).json({
      error: null,
      message: 'Input data sukses',
      data: value
    })
  } catch (error: Error | any) {
    next(
      new Error(
        `Error pad file src/controllers/barang.controller.ts : ${error.message}`
      )
    )
  }
}
