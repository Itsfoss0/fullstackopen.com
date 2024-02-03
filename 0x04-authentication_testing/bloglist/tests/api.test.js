#!/usr/bin/env jest

/* test suites for the api */

const supertest = require('supertest');
const app = require('../app');
const { initDB, clearDB } = require('./utils');

const api = supertest(app);

beforeAll(() => initDB());
afterAll(() => clearDB());

describe('API', () => {
  test('returns the correct data on get request', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toContain('json');
  });

  test('unique ID on all the blogs', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.map((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('creates a blog and saves it', async () => {
    const newBlog = {
      title: 'Kubernetes Ingress explained',
      author: 'Billy',
      url: 'https://learnk8s.io/k8s-ingress-resource'
    };
    const userCredentials = {
      username: '@itsfoss0',
      password: 'itsfoss'
    };
    const resp = await api.post('/api/auth/login').send(userCredentials);
    const accessToken = resp.body.accessToken;
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newBlog);
    const newResponse = await api.get('/api/blogs');
    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toContain('json');
  });

  test('sets default likes to zero', async () => {
    const newBlog = {
      title: 'ClusterIP vs NodePort services K8s',
      author: 'Holga Kilgore',
      url: 'https://learnk8s.io/k8s-services-explained'
    };
    const userCredentials = {
      username: '@itsfoss0',
      password: 'itsfoss'
    };
    const resp = await api.post('/api/auth/login').send(userCredentials);
    const accessToken = resp.body.accessToken;
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newBlog);
    const newBlogId = response.body.id;
    const blogFromDB = await api.get(`/api/blogs/${newBlogId}`);
    expect(blogFromDB.status).toEqual(200);
    expect(blogFromDB.body.likes).toEqual(0);
  });

  test('rejects a blog without  url', async () => {
    const userCredentials = {
      username: '@itsfoss0',
      password: 'itsfoss'
    };
    const resp = await api.post('/api/auth/login').send(userCredentials);
    const accessToken = resp.body.accessToken;
    const badBlog = {
      title: 'What is service mesh and why do you need to care',
      author: 'Holga Kilgore'
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(badBlog);
    expect(response.status).toEqual(400);
  });

  test('rejects a blog without  title', async () => {
    const userCredentials = {
      username: '@itsfoss0',
      password: 'itsfoss'
    };
    const resp = await api.post('/api/auth/login').send(userCredentials);
    const accessToken = resp.body.accessToken;
    const badBlog = {
      url: 'http://github.com/Itsfoss0',
      author: 'Holga Kilgore'
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(badBlog);
    expect(response.status).toEqual(400);
  });

  test('requires auth to create a blog', async () => {
    const k8sBlog = {
      url: 'https://learnk8s.io',
      author: 'Holga Kilgore',
      title: 'Kubernetes for humans '
    };
    const response = await api.post('/api/blogs').send(k8sBlog);
    expect(response.status).toEqual(400);
  });

  test('requires auth to delete a blog', async () => {
    const response = await api.get('/api/blogs');
    const blogToDelete = response.body[0].id;
    await api.delete(`/api/blogs/${blogToDelete}`).expect(400);
  });

  test('only owner can delete a blog', async () => {
    const userCredentials = {
      username: '@johndoe',
      password: 'jdoe'
    };
    const resp = await api.post('/api/auth/login').send(userCredentials);
    const accessToken = resp.body.accessToken;
    const response = await api.get('/api/blogs');
    const blogToDelete = response.body[0].id;
    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
  });

  test('handles undefined routes correclty', async () => {
    await api.get('/api/foo').expect(404);
  });
});

describe('User', () => {
  test('can be created correctly', async () => {
    const user = {
      username: '@holgaKilgorereres',
      password: 'HolgaKilgore322',
      name: 'Holga kilgore'
    };
    const resp = await api.post('/api/users').send(user);
    expect(resp.status).toEqual(201);
    expect(resp.headers['content-type']).toContain('json');
    expect(resp.body).toHaveProperty('username');
  });

  test('must have unique username', async () => {
    const user = {
      username: '@holgaKilgorereres',
      password: 'HolgaKilgore322',
      name: 'Holga kilgore'
    };
    const resp = await api.post('/api/users').send(user);
    expect(resp.status).toEqual(409);
    expect(resp.headers['content-type']).toContain('json');
  });

  test('must be created with a name and password', async () => {
    const user = {
      password: 'HolgaKilgore322',
      name: 'Holga kilgore'
    };
    const resp = await api.post('/api/users').send(user);
    expect(resp.status).toEqual(400);
    expect(resp.headers['content-type']).toContain('json');
  });

  test('name and username must be alteast 3 characters', async () => {
    const badUser = {
      username: 'G',
      password: 'HolgaKilgore',
      name: 'so'
    };
    await api.post('/api/users').send(badUser).expect(400);
  });

  test('can login succesfully with correct credentials', async () => {
    const user = {
      username: '@sherlockHolmes',
      password: 'Sherlock',
      name: 'Sherlock Holmes'
    };
    await api.post('/api/users').send(user).expect(201);
    const resp = await api.post('/api/auth/login').send(user);
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('accessToken');
  });

  test('cannot login with incorrect credentials', async () => {
    const user = {
      username: '@sherlockHolmesActual',
      password: 'Sherlock',
      name: 'Holmes'
    };

    const wrongUser = { username: user.username, password: 'wrongpassword' };
    await api.post('/api/users').send(user).expect(201);
    const resp = await api.post('/api/auth/login').send(wrongUser);
    expect(resp.status).toEqual(401);
  });

  test("cannot login if the username doesn't exist", async () => {
    const user = {
      username: '@GoldEagleActual',
      password: 'goldEagle',
      name: 'Sherlock Holmes'
    };
    const resp = await api.post('/api/auth/login').send(user);
    expect(resp.status).toEqual(404);
    expect(resp.body).toHaveProperty('error');
  });
});
