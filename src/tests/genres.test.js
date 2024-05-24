const request = require('supertest')
const app = require('../app')

let id;

test('GET /genres It must get all genres', async() => {
  const res = await request(app).get('/genres')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
});

test('POST /genres It must create genres', async() => {
  const newGenres = {
    name: "Filosofia"
  }
  const res = await request(app).post('/genres').send(newGenres)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.id).toBeDefined()
  expect(res.body.name).toBe(newGenres.name)
});

test('PUT /genres/:id It must update genres', async() => {
  const updateGenres = {
    name: 'FilosofiaUpdate'
  }
  const res = await request(app).put(`/genres/${id}`).send(updateGenres)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(updateGenres.name)
});

test('DELETE /genres/:id It must delete genres', async() => {
  const res = await request(app).delete(`/genres/${id}`)
  expect(res.status).toBe(204)
})