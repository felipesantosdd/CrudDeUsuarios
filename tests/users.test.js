import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';
import { sequelize } from '../config/db.js';

describe('Users API', () => {
    let token;
    let userId;

    before(async () => {
        await sequelize.sync({ force: true });
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
        token = res.body.token;
        userId = res.body.id;
    });

    after(async () => {
        await sequelize.close();
    });

    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('email').equal('test@example.com');
        });

        it('should not get users without token', async () => {
            const res = await request(app)
                .get('/api/users');
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('msg').equal('No token, authorization denied');
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update a user', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated User',
                    email: 'updated@example.com',
                    password: 'newpassword123',
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('name').equal('Updated User');
        });

        it('should return 404 for invalid user id', async () => {
            const res = await request(app)
                .put(`/api/users/invalid-id`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated User',
                    email: 'updated@example.com',
                    password: 'newpassword123',
                });
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('msg').equal('User not found');
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete a user', async () => {
            const res = await request(app)
                .delete(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('msg').equal('User removed');
        });

        it('should return 404 for invalid user id', async () => {
            const res = await request(app)
                .delete(`/api/users/invalid-id`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('msg').equal('User not found');
        });
    });
});
