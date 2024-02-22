/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextFunction, type Request, type Response } from 'express'
import { inputUserValidation } from '../validations/user.validation'
import { createUser } from '../services/user.service'
import { encrypt } from '../utils/bcrypt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }

    //   encrypt password
    value.password = encrypt(value.password)
    delete value.confirmPassword

    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'Input data berhasil',
      data: user
    })
  } catch (error: Error | any) {
    next(
      new Error(
        `Error pada file src/controller/user.controller.ts : registerUser - ${error.message}`
      )
    )
  }
}
