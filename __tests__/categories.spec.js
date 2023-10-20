const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../src/config/index');
const uri = config.databaseURL;
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const passport = require('passport');
const chai = require('chai');
const expect = chai.expect;
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
    app.request.isAuthenticated = function () {
      return true;
    };
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should access the protected route with Google OAuth authentication', async () => {
    const user = {
      googleId: '123456789',
      displayName: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      image: 'https://example.com/testuser.jpg'
    };
    const response = await request.get('/users').set('user', JSON.stringify(user)).expect(200);
  });
});

test('respond to get all /categories', async () => {
  const response = await request.get('/categories').expect(200);
});

test('respond to a specific /categories/id', async () => {
  const response = await request.get('/categories/65329c98efb09d062e7a8ab3').expect(200);
  expect(response.body).to.have.property('userId');
  expect(response.body).to.have.property('categoryName');
});

test('respond to post /categories', async () => {
  const response = await request
    .post('/categories')
    .send({ userId: '65275353941bfccbf0de1135', categoryName: 'School' });
  expect(204);
});

test('respond to a specific /categories/id', async () => {
  const response = await request.put('/categories/65329c98efb09d062e7a8ab3').send({
    userId: '65275353941bfccbf0de1135',
    categoryName: 'School'
  });
  expect(204);
});

test('respond to delete /categories', async () => {
  const response = await request.delete('/categories/6527678ff7fe385cf16b10a4');
  expect(204);
});
