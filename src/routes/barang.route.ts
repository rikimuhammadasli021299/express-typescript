import { Router } from 'express'
import { getAllBarang, insertBarang } from '../controllers/barang.controller'

const barangRouter = Router()

barangRouter.get('/barang', getAllBarang)
barangRouter.post('/barang', insertBarang)

export default barangRouter
