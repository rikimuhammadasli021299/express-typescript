import { Router } from 'express'
import barangRouter from './barang.route'

const app = Router()

app.use('/api', barangRouter)

export default app
