const server = require('../api/server');
const db = require('../database/dbConfig');
const { application } = require('express');
const supertest = require('supertest');

beforeEach(() => {
  return db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('authorization test', () => {
  jest.setTimeout(95000);

  let token = null;

  it('POST Admin Register', async () => {
    const res = await supertest(server).post('/auth/register').send({
      email: 'admin111@gmail.com',
      firstname: 'admin1',
      lastname: 'last1',
      password: 'password',
      accountType: 'admin',
    });
    expect(res.statusCode).toBe(201);
  });
  it('POST Admin Login', async () => {
    await supertest(server).post('/auth/register').send({
      email: 'admin111@gmail.com',
      firstname: 'admin1',
      lastname: 'last1',
      password: 'password',
      accountType: 'admin',
    });
    const res = await supertest(server).post('/auth/login').send({
      email: 'admin111@gmail.com',
      password: 'password',
    });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });
  it('POST Volunteer Register', async () => {
    const res = await supertest(server).post('/auth/register').send({
      email: 'voluteer111@gmail.com',
      firstname: 'vol1',
      lastname: 'last1',
      password: 'password',
      accountType: 'volunteer',
      availability: 'Morning',
      state: 'Indiana',
    });
    expect(res.statusCode).toBe(201);
  });
  it('POST Volunteer Login', async () => {
    await supertest(server).post('/auth/register').send({
      email: 'volunteer1@gmail.com',
      firstname: 'Amy',
      lastname: 'Baker',
      password: 'password',
      availability: 'Weekends',
      state: 'Arizona',
      accountType: 'volunteer',
    });
    const res = await supertest(server).post('/auth/login').send({
      email: 'volunteer1@gmail.com',
      password: 'password',
    });
    expect(res.statusCode).toBe(200);
  });

  it('GET Tasks', async () => {
    const res = await supertest(server).get('/dashboard/assignTasks');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  it('GET Volunteers', async () => {
    const res = await supertest(server).get(
      '/dashboard/assignTasks/volunteers'
    );
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  it('GET Volunteer at ID 1', async () => {
    const res = await supertest(server).get(
      '/dashboard/assignTasks/volunteers/1'
    );
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  // it('POST Task', async () => {
  //   // await supertest(server).post('/auth/register').send({
  //   //   email: 'admin1@gmail.com',
  //   //   firstname: 'admin1',
  //   //   lastname: 'last1',
  //   //   password: 'password',
  //   //   accountType: 'admin',
  //   // });

  //   // await supertest(server).post('/auth/register').send({
  //   //   email: 'volunteer1@gmail.com',
  //   //   firstname: 'vol1',
  //   //   lastname: 'last1',
  //   //   password: 'password',
  //   //   accountType: 'volunteer',
  //   //   availability: 'Morning',
  //   //   state: 'Indiana',
  //   // });

  //   await supertest(server).post('/auth/login').send({
  //     email: 'admin1@gmail.com',
  //     password: 'password',
  //   });

  //   const res = await supertest(server)
  //     .post('/dashboard/assignTasks')
  //     .send({
  //       title: 'Test Title',
  //       description: 'testing the description',
  //       volunteer_email: 'volunteer1@gmail.com',
  //     })
  //     .auth(token, { type: 'bearer' });
  //   expect(res.statusCode).toBe(201);
  // });
});
