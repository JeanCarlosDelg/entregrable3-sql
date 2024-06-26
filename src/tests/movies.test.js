const request = require('supertest')
const app = require('../app');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');
const Actors = require('../models/Actors');

let id;

test('GET /movies It must get all movies', async() => {
  const res = await request(app).get('/movies')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
});

test('POST /movies It must create movie', async() => {
  const newMovies = {
    name: "Lucifer",
    image: 'prueba',
    synopsis: 'texto prueba',
    releaseYear: '2002'
  }
  const res = await request(app).post('/movies').send(newMovies)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(res.body.id).toBeDefined()
  expect(res.body.name).toBe(newMovies.name)
});

test('PUT /movies/:id It must update movie', async() => {
  const updateMovies = {
    name: 'LuciferUpdate'
  }
  const res = await request(app).put(`/movies/${id}`).send(updateMovies)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(updateMovies.name)
});

test('POST /movies/:id/genres It must insert genres in movie', async () => {
  const genres = await Genres.create({
    name: 'terror'
  })
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genres.id])
  await genres.destroy()
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors It must insert directors in movie', async () => {
  const director = await Directors.create({
    firstName: "Jean",
    lastName: "Delgado",
    nationality: "Ecuador",
    image: "prueba",
    birthday: "1996-08-14"
  })
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id])
  await director.destroy()
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors It must insert actors in movie', async () => {
  const actor = await Actors.create({
    firstName: 'Jean',
    lastName: 'Delgado',
    nationality: 'Ecuador',
    image: 'prueba',
    birthday: '1996-08-14'
  })
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id])
  await actor.destroy()
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id It must delete movie', async() => {
  const res = await request(app).delete(`/movies/${id}`)
  expect(res.status).toBe(204)
})
