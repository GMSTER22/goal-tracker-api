const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../src/config/index');
const uri = config.databaseURL;
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

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
  //
  //

  it('respond to get all /categories', async () => {
    const response = await request.get('/categories');
    expect(response.statusCode).toBe(200);
  });

  it('respond to get a specific /categories/id', async () => {
    const response = await request.get('/categories/65329c98efb09d062e7a8ab3');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('categoryName');
  });

  it('respond to get all /users', async () => {
    const response = await request.get('/users');
    expect(response.statusCode).toBe(200);
  });

  it('respond to get a specific /users/id', async () => {
    const response = await request.get('/users/6532a1b66073cec6c214f06f');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('googleId');
    expect(response.body).toHaveProperty('displayName');
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('image');
  });

  it('respond to get all /comments', async () => {
    const response = await request.get('/comments');
    expect(response.statusCode).toBe(200);
  });

  it('respond to get a specific /comments/id', async () => {
    const response = await request.get('/comments/6527685ff7fe385cf16b10a9');
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('goalId');
    expect(response.body).toHaveProperty('text');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.statusCode).toBe(200);
  });

  it('respond to get all /goals', async () => {
    const response = await request.get('/goals');
    expect(response.statusCode).toBe(200);
  });

  it('respond to get a specific /goals/id', async () => {
    const response = await request.get('/goals/652757fd941bfccbf0de1146');
    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('categoryId');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('startDate');
    expect(response.body).toHaveProperty('dueDate');
    expect(response.body).toHaveProperty('progress');
  });

  //
  //
  //POST requests
  it('respond to post /categories', async () => {
    const response = await request
      .post('/categories')
      .send({ userId: '65275353941bfccbf0de1135', categoryName: 'School' })
      .expect(204);
  });

  it('respond to post /comments', async () => {
    const response = await request
      .post('/comments')
      .send({
        userId: '65275353941bfccbf0de1137',
        goalId: '652757fd941bfccbf0de1144',
        text: 'Great progress on this goal! Keep it up!',
        createdAt: '2023-10-15'
      })
      .expect(204);
  });

  it('respond to post /goals', async () => {
    const response = await request
      .post('/goals')
      .send({
        userId: '65275353941bfccbf0de1135',
        categoryId: '6527678ff7fe385cf16b10a8',
        title: 'Complete Project A',
        description: 'Finish all tasks related to Project A',
        startDate: '2023-10-15',
        dueDate: '2023-12-15',
        progress: 30
      })
      .expect(204);
  });

  it('respond to post /users', async () => {
    const response = await request
      .post('/users')
      .send({
        googleId: '1078113323248215026523429',
        displayName: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocLjmyWMHwI7U1M-wpt67zfh_P6l2'
      })
      .expect(204);
  });

  //PUT requests
  //
  //
  it('respond to update a specific /categories/id', async () => {
    const response = await request.put('/categories/65329c98efb09d062e7a8ab3').send({
      userId: '65275353941bfccbf0de1135',
      categoryName: 'School'
    });
    expect(204);
  });

  it('respond to update a specific /comments/id', async () => {
    const response = await request
      .put('/comments/6527685ff7fe385cf16b10a9')
      .send({
        userId: '65275353941bfccbf0de1137',
        goalId: '652757fd941bfccbf0de1144',
        text: 'Great progress on this goal! Keep it up!',
        createdAt: '2023-10-15'
      })
      .expect(204);
  });

  it('respond to update /goals/id', async () => {
    const response = await request
      .put('/goals/652757fd941bfccbf0de1146')
      .send({
        userId: '65275353941bfccbf0de1136',
        categoryId: '6527678ff7fe385cf16b10a8',
        title: 'Complete Project A',
        description: 'Finish all tasks related to Project A',
        startDate: '2023-10-15',
        dueDate: '2023-12-15',
        progress: 30
      })
      .expect(204);
  });

  it('respond to update /users/id', async () => {
    const response = await request
      .put('/users/65275353941bfccbf0de1135')
      .send({
        googleId: '1078113323248215026523429',
        displayName: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocLjmyWMHwI7U1M-wpt67zfh_P6l2'
      })
      .expect(204);
  });

  //DELETE requests
  //
  //
  it('respond to delete a single /categories/id', async () => {
    const response = await request.delete('/categories/6527678ff7fe385cf16b10a4');
    expect(204);
  });
  it('respond to delete a single /comments/id', async () => {
    const response = await request.delete('/comments/6532c283f2b5bb84ff7099fa');
    expect(204);
  });
  it('respond to delete a single /goals/id', async () => {
    const response = await request.delete('/goals/6532c2e1c28fc60296a99d2e');
    expect(204);
  });
  it('respond to delete a single /users/id', async () => {
    const response = await request.delete('/users/6532c073bb372e2c5cd59f25');
    expect(204);
  });
});
