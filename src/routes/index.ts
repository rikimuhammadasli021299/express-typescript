import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controllers/error.controller'

const app = Router()

app.use('/api', barangRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app
