import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';
import { sequelize } from '../config/db.js';

describe('Auth API', () => {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    after(async () => {
        await sequelize.close();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });

        it('should not register a user with an existing email', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                });
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('msg').equal('User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login a user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });

        it('should not login a user with invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                });
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('msg').equal('Invalid credentials');
        });
    });
});
