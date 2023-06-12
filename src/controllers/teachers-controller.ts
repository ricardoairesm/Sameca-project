import { Request, Response } from 'express';
import httpStatus from 'http-status';
import teacherService from '@/services/teachers-service';

export async function teachersPost(req: Request, res: Response) {
  const { name } = req.body;
  try {
    const teacher = await teacherService.createTeacher(name);
    return res.status(httpStatus.CREATED).send({
      id: teacher.id,
      name: teacher.name,
    });
  } catch (error) {
    if (error.name === 'DuplicatedNameError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getTeachers(req: Request, res: Response) {
  try {
    const teachers = await teacherService.listTeachers();
    return res.status(httpStatus.OK).send(teachers);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
