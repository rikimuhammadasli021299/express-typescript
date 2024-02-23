/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  deleteDataBarang,
  getAllBarang,
  getDataBarangById,
  insertDataBarang,
  updateDataBarang
} from '../controllers/barang.controller'
import { authenticate } from '../controllers/error.controller'

const barangRouter = Router()

barangRouter.get('/barang', authenticate, getAllBarang)
barangRouter.get('/barang/:id', authenticate, getDataBarangById)
barangRouter.post('/barang', authenticate, insertDataBarang)
barangRouter.put('/barang/:id', authenticate, updateDataBarang)
barangRouter.delete('/barang/:id', authenticate, deleteDataBarang)

export default barangRouter
