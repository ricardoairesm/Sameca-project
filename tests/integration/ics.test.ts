import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createTeacher } from '../factories/teachers-factory';
import { createIc } from '../factories/ics-factory';

beforeEach(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /ics', () => {

    it('should respond with status 400 when body is not given', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const response = await server.post('/ics').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post('/ics').send(invalidBody).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
        const generateValidBody = () => ({
            name: faker.name.findName(),
            image: faker.image.avatar(),
            description: faker.lorem.paragraph(),
            gratification: "sim",
            gratificationSpots: 2,
        });

        it('should respond with status 401 when there is no autorization', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const response = await server.post('/ics');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it('should respond with status 201 and create ic when given name is unique', async () => {
            const body = generateValidBody();
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const completeBody = {
                ...body,
                teacherId: teacher.id,
            }

            const response = await server.post('/ics').set('Authorization', `Bearer ${token}`).send(completeBody);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                name: body.name,
            });
        });

        it('should save teacher on db', async () => {
            const body = generateValidBody();
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const completeBody = {
                ...body,
                teacherId: teacher.id,
            }

            const response = await server.post('/ics').set('Authorization', `Bearer ${token}`).send(completeBody);

            const course = await prisma.iCs.findUnique({
                where: { name: body.name },
            });
            expect(course).toEqual(
                expect.objectContaining({
                    id: response.body.id,
                    name: body.name,
                }),
            );
        });
    });
});

describe('GET /ics', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.get('/ics');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the ics', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })

        const response = await server.get('/ics').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: ic.id,
            name: ic.name,
            image: ic.image,
            description: ic.description,
            gratification: ic.gratification,
            gratificationSpots: ic.gratificationSpots,
            teacherId: teacher.id,
            createdAt:ic.createdAt.toISOString(),
            updatedAt:ic.updatedAt.toISOString(),
        }]);
    });

});


describe('GET /ics/:icId', () => {

    it('should respond with status 401 when there is no autorization', async () => {
        const response = await server.get('/ics');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 400 when there is no ic with that id', async () => {
        const response = await server.get('/ics/8538935');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the ics', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })

        const response = await server.get(`/ics/${ic.id}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: ic.id,
            name: ic.name,
            image: ic.image,
            description: ic.description,
            gratification: ic.gratification,
            gratificationSpots: ic.gratificationSpots,
            teacherId: teacher.id,
            createdAt:ic.createdAt.toISOString(),
            updatedAt:ic.updatedAt.toISOString(),
        });
    });

});