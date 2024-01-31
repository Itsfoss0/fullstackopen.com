#!/usr/bin/env jest

/* test suites for the api */

const supertest = require('supertest');
const app = require('../app');
const { initDB, clearDB, blogs } = require('./utils');

const api = supertest(app);

beforeAll(() => initDB());
afterAll(() => clearDB());

describe('API', () => {
  test('returns the correct data on get request', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
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
    const response = await api.post('/api/blogs').send(newBlog);
    const newResponse = await api.get('/api/blogs');
    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toContain('json');
    expect(newResponse.body).toHaveLength(blogs.length + 1);
  });

  test('sets default likes to zero', async () => {
    const newBlog = {
      title: 'ClusterIP vs NodePort services K8s',
      author: 'Holga Kilgore',
      url: 'https://learnk8s.io/k8s-services-explained'
    };
    const response = await api.post('/api/blogs').send(newBlog);
    const newBlogId = response.body.id;
    const blogFromDB = await api.get(`/api/blogs/${newBlogId}`);
    expect(blogFromDB.status).toEqual(200);
    expect(blogFromDB.body.likes).toEqual(0);
  });

  test('rejects a blog without  url', async () => {
    const badBlog = {
      title: 'What is service mesh and why do you need to care',
      author: 'Holga Kilgore'
    };
    const response = await api.post('/api/blogs').send(badBlog);
    expect(response.status).toEqual(400);
  });

  test('rejects a blog without  title', async () => {
    const badBlog = {
      url: 'http://learnk8s.io/',
      author: 'Holga Kilgore'
    };
    const response = await api.post('/api/blogs').send(badBlog);
    expect(response.status).toEqual(400);
  });

  test('deletes a blog corectly', async () => {
    const response = await api.get('/api/blogs');
    const blogToDelete = response.body[0].id;
    await api.delete(`/api/blogs/${blogToDelete}`).expect(204);
    await api.get(`/api/blogs/${blogToDelete}`).expect(404);
  });

  test('updates a blog correctly', async () => {
    const response = await api.get('/api/blogs');
    const blogToUpdate = response.body[0];
    const updatedBlog = {
      likes: blogToUpdate.likes + 1,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('oders blogs correctly on response', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toContain('json');
    expect(response.body[0].title).toEqual(blogs[0].title);
  });
});
