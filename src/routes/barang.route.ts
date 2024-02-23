import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.controller'
import { authenticate } from '../controllers/error.controller'

const barangRouter = Router()

barangRouter.get('/barang', authenticate, expressAsyncHandler(getAllBarang))
barangRouter.get(
  '/barang/:id',
  authenticate,
  expressAsyncHandler(getDataBarangById)
)
barangRouter.post(
  '/barang',
  authenticate,
  expressAsyncHandler(insertDataBarang)
)
barangRouter.put(
  '/barang/:id',
  authenticate,
  expressAsyncHandler(updateDataBarang)
)
barangRouter.delete(
  '/barang/:id',
  authenticate,
  expressAsyncHandler(deleteDataBarang)
)

export default barangRouter
