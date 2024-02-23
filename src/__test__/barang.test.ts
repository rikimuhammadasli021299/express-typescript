import supertest from 'supertest'
import { generateAccessToken } from '../utils/jwt'
import web from '../middleware/web'
import prisma from '../utils/client'

const getToken = (): string => {
  const usr = {
    user_id: 'e29ee8e8-eacd-4729-b8fc-3b4bda948021',
    email: 'rikimuhammadnurhidayat@gmail.com',
    nama: 'Riki Muhammad',
    password: 'xxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }

  return generateAccessToken(usr)
}

describe('barang', () => {
  it('ambil semua data barang dengan token', async () => {
    const token = getToken()
    const response = await supertest(web)
      .get('/api/barang')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response.body.message).toEqual('Pengambilan semua data berhasil')
  })

  it('ambil semua data barang tanpa token', async () => {
    const response = await supertest(web).get('/api/barang')

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Tidak dapat akses')
  })

  it('ambil data barang dengan id dan token', async () => {
    const token = getToken()
    const response = await supertest(web)
      .get('/api/barang/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.message).toEqual('Pengambilan data sukses')
  })

  it('ambil data barang dengan id dan tanpa token', async () => {
    const response = await supertest(web).get('/api/barang/1')

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Tidak dapat akses')
  })

  it('input data barang dengan token', async () => {
    const token = getToken()
    const response = await supertest(web)
      .post('/api/barang')
      .send({ nama: 'testing', jumlah: '0', harga: '1000' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Input data sukses')
  })

  it('input data barang tanpa token', async () => {
    const response = await supertest(web)
      .post('/api/barang')
      .send({ nama: 'testing', jumlah: '0', harga: '1000' })

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Tidak dapat akses')
  })

  it('input data barang dengan token data tidak valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .post('/api/barang')
      .send({ nama: '', jumlah: '', harga: '1000' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Input data gagal')
  })

  it('update data barang dengan token', async () => {
    const token = getToken()
    const response = await supertest(web)
      .put('/api/barang/1')
      .send({ nama: 'testing update', jumlah: '1', harga: '1000' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Update data sukses')
  })

  it('update data barang tanpa token', async () => {
    const response = await supertest(web)
      .put('/api/barang/1')
      .send({ nama: 'testing update', jumlah: '1', harga: '1000' })

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('Tidak dapat akses')
  })

  it('update data barang dengan token data tidak valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .put('/api/barang/1')
      .send({ nama: '', jumlah: '', harga: '1000' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Update data gagal')
  })

  it('delete data barang dengan token', async () => {
    const token = getToken()
    const response = await supertest(web)
      .delete('/api/barang/10')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Delete data sukses')
  })

  afterAll(async () => {
    await prisma.barang.deleteMany({
      where: { nama: 'testing' }
    })
  })
})
