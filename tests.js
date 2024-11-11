// tests/task.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/taskapp_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Task API', () => {
    test('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test task',
                completed: false
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Test task');
    });

    test('should get all tasks', async () => {
        const response = await request(app)
            .get('/api/tasks');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});
