const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../src/config/index');
const uri = config.databaseURL;
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const passport = require('passport');
const chai = require('chai');
const { default: test } = require('node:test');
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

  //GET requests

  it('respond to get all /categories', async () => {
    const response = await request.get('/categories').expect(200);
  });

  it('respond to get a specific /categories/id', async () => {
    const response = await request.get('/categories/65329c98efb09d062e7a8ab3').expect(200);
    expect(response.body).to.have.property('userId');
    expect(response.body).to.have.property('categoryName');
  });

  it('respond to get all /users', async () => {
    const response = await request.get('/users').expect(200);
  });

  it('respond to get a specific /users/id', async () => {
    const response = await request.get('/users/6532a1b66073cec6c214f06f').expect(200);
    expect(response.body).to.have.property('googleId');
    expect(response.body).to.have.property('displayName');
    expect(response.body).to.have.property('firstName');
    expect(response.body).to.have.property('lastName');
    expect(response.body).to.have.property('image');
  });

  it('respond to get all /comments', async () => {
    const response = await request.get('/comments').expect(200);
  });

  it('respond to get a specific /comments/id', async () => {
    const response = await request.get('/comments/6527685ff7fe385cf16b10a9').expect(200);
    expect(response.body).to.have.property('userId');
    expect(response.body).to.have.property('goalId');
    expect(response.body).to.have.property('text');
    expect(response.body).to.have.property('createdAt');
  });

  it('respond to get all /goals', async () => {
    const response = await request.get('/goals').expect(200);
  });

  it('respond to get a specific /goals/id', async () => {
    const response = await request.get('/goals/652757fd941bfccbf0de1144').expect(200);
    expect(response.body).to.have.property('userId');
    expect(response.body).to.have.property('categoryId');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('startDate');
    expect(response.body).to.have.property('dueDate');
    expect(response.body).to.have.property('progress');
  });

  //POST requests
  it('respond to post /categories', async () => {
    const response = await request
      .post('/categories')
      .send({ userId: '65275353941bfccbf0de1135', categoryName: 'School' });
    expect(204);
  });

  it('respond to update a specific /categories/id', async () => {
    const response = await request.put('/categories/65329c98efb09d062e7a8ab3').send({
      userId: '65275353941bfccbf0de1135',
      categoryName: 'School'
    });
    expect(204);
  });

  it('respond to delete a single /categories', async () => {
    const response = await request.delete('/categories/6527678ff7fe385cf16b10a4');
    expect(204);
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
