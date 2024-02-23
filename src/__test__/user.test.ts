import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'

const getRefreshToken = (): string => {
  const usr = {
    user_id: 'e29ee8e8-eacd-4729-b8fc-3b4bda948021',
    email: 'rikimuhammadnurhidayat@gmail.com',
    nama: 'Riki Muhammad',
    password: 'xxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }

  return generateRefreshToken(usr)
}

describe('user', () => {
  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'rikimuhammadasli@gmail.com',
      password: 'Riki021299!!!'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login sukses')
  })

  it('user login email tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'rikimuhammadaslixxx@gmail.com',
      password: 'Riki021299!!!'
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Login gagal')
  })

  it('user login pasword tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'rikimuhammadasli@gmail.com',
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'riki123@gmail.com'
      }
    })
  })

  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      email: 'riki123@gmail.com',
      nama: 'Riki Muhammad',
      password: '123456',
      confirmPassword: '123456'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Input data berhasil')
  })

  it('register user data tidak valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      email: 'riki123@gmail.com',
      nama: 'Riki Muhammad',
      password: '12345',
      confirmPassword: '123456'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Input data gagal')
  })

  it('refresh token valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', `Bearer ${getRefreshToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Refresh token sukses')
  })

  it('refresh token tidak valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', 'Bearer 23456789qwertyu')
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Verifikasi refresh token gagal')
  })
})
