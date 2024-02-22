import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controllers/error.controller'
import userRouter from './user.route'

const app = Router()

app.use('/api', barangRouter)
app.use('/api', userRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app
