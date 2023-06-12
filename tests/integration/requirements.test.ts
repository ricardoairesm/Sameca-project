import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createRequirement, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createTeacher } from '../factories/teachers-factory';
import { createIc } from '../factories/ics-factory';
import { createLike } from '../factories/likes-factory';
import { createCourses } from '../factories/courses-factory';

beforeEach(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /requirements', () => {

    it('should respond with status 400 when body is not given', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const response = await server.post('/requirements').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post('/requirements').send(invalidBody).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
        it('should respond with status 401 when there is no autorization', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const response = await server.post('/requirements');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it('should respond with status 201 and create requirement', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const teacher = await createTeacher();
            const ic = await createIc({ teacherId: teacher.id });
            const course = await createCourses();
            const body = {
                courseId: course.id,
                icId: ic.id
            }

            const response = await server.post('/requirements').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                icId: ic.id,
                courseId: course.id,
            });
        });
    });
});

describe('GET /requirements/:icId', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.get('/requirements');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and list the requirements', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id });
        const course = await createCourses();
        const requirement = await createRequirement({
            CoursesId: course.id,
            ICSId: ic.id
        })

        const response = await server.get(`/requirements/${ic.id}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: requirement.id,
            CoursesId: course.id,
            ICSId: ic.id
        }]);
    });

});

describe('DELETE /requirements/:requirementId', () => {
    it('should respond with status 401 when there is no autorization', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const response = await server.delete('/requirements');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 and delete the like', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const teacher = await createTeacher();
        const ic = await createIc({ teacherId: teacher.id })
        const course = await createCourses();
        const requirement = await createRequirement({
            CoursesId: course.id,
            ICSId: ic.id,
        })

        const response = await server.delete(`/requirements/${requirement.id}`).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: requirement.id,
            courseId: course.id,
            icId: ic.id,
        });
    });

});