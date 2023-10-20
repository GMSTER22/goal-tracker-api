const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../src/config/index');
const uri = config.databaseURL;
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const passport = require('passport');

const sum = (a, b) => a + b;

describe('Categories tests', () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  test('respond to get all /categories', async () => {
    const response = await request.get('/categories');
    expect(response.statusCode).toBe(200);
  });

  // test('respond to a specific /categories/id', async () => {
  //   const response = await request.get('/categories/6527678ff7fe385cf16b10a4');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('userId');
  //   expect(response.body).toHaveProperty('categoryName');
  // });

  // test('respond to post /categories', async () => {
  //   const response = await request
  //     .post('/categories')
  //     .send({ userId: '65275353941bfccbf0de1135', categoryName: 'School' });
  //   expect(response.statusCode).toBe(204);
  // });

  // test('respond to a specific /categories/id', async () => {
  //   const response = (await request.put('/categories/6527678ff7fe385cf16b10a4')).send({
  //     userId: '65275353941bfccbf0de1135',
  //     categoryName: 'School'
  //   });
  //   expect(response.statusCode).toBe(204);
  // });

  // test('respond to delete /categories', async () => {
  //   const response = await request.delete('/categories/6527678ff7fe385cf16b10a4');
  //   expect(response.statusCode).toBe(204);
  // });

  // test('adds 1 + 1', () => {
  //   expect(sum(1, 1)).toBe(2);
  // });
});
