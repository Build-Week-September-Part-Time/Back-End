const server = require('../api/server')
const db = require('../database/dbConfig')
const {application} = require('express')
const supertest = require('supertest');

  
afterAll(async () => {
await db.destroy();
});

describe('Admin Route Tests', () => {
    jest.setTimeout(45000)
    it('GET Tasks', async () => {
        const res = await supertest(server).get('/dashboard/assignTasks')
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');

    })
    
});