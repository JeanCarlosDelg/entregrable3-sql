const request = require('supertest')
const app = require('../app')

let id;

test('GET /actors debe traer todos los actores', async() => {
  const res = await request(app).get('/actors')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
});

test('POST /actors debe crear un actor', async() => {
  const newActors = {
    firstName: 'Jean',
    lastName: 'Delgado',
    nationality: 'Ecuador',
    image: 'prueba',
    birthday: '1996-08-14'
  }
  const res = await request(app).post('/actors').send(newActors)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.id).toBeDefined()
  expect(res.body.firstName).toBe(newActors.firstName)
});

test('PUT /actors/:id debe de actualizar un actor', async() => {
  const updateActors = {
    firstName: 'JeanUpdate'
  }
  const res = await request(app).put(`/actors/${id}`).send(updateActors)
  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(updateActors.firstName)
});

test('DELETE /actors/:id debe eliminar un genero', async() => {
  const res = await request(app).delete(`/actors/${id}`)
  expect(res.status).toBe(204)
})