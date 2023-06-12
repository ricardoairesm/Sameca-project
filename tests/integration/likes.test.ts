import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createTeacher } from '../factories/teachers-factory';
import { createIc } from '../factories/ics-factory';
import { createLike } from '../factories/likes-factory';

beforeEach(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /likes', () => {

    it('should respond with status 400 when body is not given', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const response = await server.post('/likes').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post('/likes').send(invalidBody).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
        it('should respond with status 401 when there is no autorization', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const response = await server.post('/likes');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it('should respond with status 201 and create like', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const ic = await createIc({ teacherId: teacher.id })
            const body = {
                userId: user.id,
                icId: ic.id
            }

            const response = await server.post('/likes').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                icId: ic.id,
                userId: user.id,
            });
        });
    });
});

describe('GET /likes/:icId', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.get('/likes');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the likes', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })
        const like = await createLike(
            {
                userId: user.id,
                icId: ic.id
            }
        )

        const response = await server.get(`/likes/${ic.id}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: like.id,
            userId:user.id,
            icId:ic.id,
        }]);
    });

});


describe('GET /likes/user/:icId', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.get('/likes');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the likes', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })
        const like = await createLike(
            {
                userId: user.id,
                icId: ic.id
            }
        )

        const response = await server.get(`/likes/user/${user.id}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: like.id,
            userId:user.id,
            icId:ic.id,
        }]);
    });

});

describe('DELETE /likes', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.delete('/likes');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and delete the like', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })
        const like = await createLike(
            {
                userId: user.id,
                icId: ic.id
            }
        )
        const body = {userId:like.userId,
        icId:like.icId,
        }

        const response = await server.delete(`/likes`).set('Authorization', `Bearer ${token}`).send(body);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: like.id,
            userId:user.id,
            icId:ic.id,
        });
    });

});