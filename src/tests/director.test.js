const request = require("supertest");
const app = require("../app");

let id;

test("GET /directors It must get all directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors It must create director", async () => {
  const newDirector = {
    firstName: "Jean",
    lastName: "Delgado",
    nationality: "Ecuador",
    image: "prueba",
    birthday: "1996-08-14",
  };
  const res = await request(app).post("/directors").send(newDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newDirector.firstName);
});

test("PUT /directors/:id It must update director", async () => {
  const updateDirector = {
    firstName: "JeanUpdate",
  };
  const res = await request(app).put(`/directors/${id}`).send(updateDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateDirector.firstName);
});

test("DELETE /directors/:id It must delete director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
