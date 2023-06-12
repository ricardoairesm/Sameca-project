import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createCourses } from '../factories/courses-factory';

beforeEach(async () => {
    await init();
    await cleanDb();
});



const server = supertest(app);

describe('POST /courses', () => {


    it('should respond with status 400 when body is not given', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const response = await server.post('/courses').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post('/courses').send(invalidBody).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
        const generateValidBody = () => ({
            name: faker.name.findName(),
        });

        it('should respond with status 401 when there is no autorization', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.post('/courses');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it('should respond with status 201 and create course when given name is unique', async () => {
            const body = generateValidBody();
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/courses').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                name: body.name,
            });
        });

        it('should save course on db', async () => {
            const body = generateValidBody();
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server.post('/courses').set('Authorization', `Bearer ${token}`).send(body);

            const course = await prisma.courses.findUnique({
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

describe('GET /courses', () => {

    it('should respond with status 401 when there is no autorization', async () => {
        const response = await server.get('/teachers');
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the courses', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const course = await createCourses();
        const response = await server.get('/courses').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: course.id,
            name: course.name,
            createdAt:course.createdAt.toISOString(),
            updatedAt:course.updatedAt.toISOString(),
        }]);
    });

});


