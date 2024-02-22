import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.controller'

const barangRouter = Router()

barangRouter.get('/barang', expressAsyncHandler(getAllBarang))
barangRouter.get('/barang/:id', expressAsyncHandler(getDataBarangById))
barangRouter.post('/barang', expressAsyncHandler(insertDataBarang))
barangRouter.put('/barang/:id', expressAsyncHandler(updateDataBarang))
barangRouter.delete('/barang/:id', expressAsyncHandler(deleteDataBarang))

export default barangRouter
