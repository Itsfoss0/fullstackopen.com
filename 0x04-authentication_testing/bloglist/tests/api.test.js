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
});
