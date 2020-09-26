const server = require('../api/server')
const db = require('../database/dbConfig')
const {application} = require('express')
const supertest = require('supertest');

beforeEach(async () => {
    await db.seed.run();
  });
  
afterAll(async () => {
await db.destroy();
});

describe('authorization test', () => {
    jest.setTimeout(45000)
    it('POST Admin Register', async () => {
        const res = await supertest(server).post('/auth/register').send({
            email: 'admin111@gmail.com',
            firstname: 'admin1',
            lastname: 'last1',
            password: 'password',
            accountType: 'admin'
        })
        expect(res.statusCode).toBe(201);

    })
    it('POST Admin Login', async () => {
        await supertest(server).post('/auth/register').send({
            email: 'admin111@gmail.com',
            firstname: 'admin1',
            lastname: 'last1',
            password: 'password',
            accountType: 'admin'
        })
        const res = await supertest(server).post('/auth/login').send({
            email: 'admin111@gmail.com',
            password: 'password'
        })
        expect(res.statusCode).toBe(200);
    })
    it('POST Volunteer Register', async () => {
        const res = await supertest(server).post('/auth/register').send({
            email: 'voluteer111@gmail.com',
            firstname: 'vol1',
            lastname: 'last1',
            password: 'password',
            accountType: 'volunteer',
            availability: 'Morning',
            state: 'Indiana'
        })
        expect(res.statusCode).toBe(201);

    })
    it('POST Volunteer Login', async () => {
        await supertest(server).post('/auth/register').send({
            email: 'volunteer1@gmail.com',
            firstname: 'Amy',
            lastname: 'Baker',
            password: 'password',
            availability: 'Weekends',
            state: 'Arizona',
            accountType: 'volunteer',
        })
        const res = await supertest(server).post('/auth/login').send({
            email: 'volunteer1@gmail.com',
            password: 'password'
        })
        expect(res.statusCode).toBe(200);
    })
});