import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import courseService from '@/services/courses-service';

export async function coursesPost(req: AuthenticatedRequest, res: Response) {
    const { name } = req.body;
    try {
        const course = await courseService.createCourse({ name });
        return res.status(httpStatus.CREATED).json({
            id: course.id,
            name: course.name,
        });
    } catch (error) {
        if (error.name === 'DuplicatedNameError') {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function listCourses(req: AuthenticatedRequest, res: Response) {
    try {
        const courses = await courseService.listAllCourses();
        return res.status(httpStatus.OK).send(courses);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}
