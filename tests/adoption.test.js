
const request = require('supertest');
const express = require('express');
const adoptionRouter = require('../src/routers/api/adoption.router.js');

const app = express();
app.use(express.json());
app.use('/api/adoption', adoptionRouter);

describe('Adoption Router Endpoints', () => {
    describe('GET /api/adoption', () => {
        it('debe devolver un array vacío (mock)', async () => {
            const res = await request(app).get('/api/adoption');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /api/adoption', () => {
        it('debe crear una adopción y devolver mensaje', async () => {
            const res = await request(app)
                .post('/api/adoption')
                .send({ userId: 'user1', petId: 'pet1' });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Adopción creada');
        });
    });

    describe('PUT /api/adoption/:id', () => {
        it('debe actualizar una adopción y devolver mensaje', async () => {
            const res = await request(app)
                .put('/api/adoption/123')
                .send({ status: 'aprobada' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Adopción actualizada');
        });
    });

    describe('DELETE /api/adoption/:id', () => {
        it('debe eliminar una adopción y devolver mensaje', async () => {
            const res = await request(app).delete('/api/adoption/123');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Adopción eliminada');
        });
    });
});
