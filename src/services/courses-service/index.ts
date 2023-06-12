import { Courses } from '@prisma/client';
import { Prisma } from '@prisma/client'
import courseRepository from '@/repositories/courses-repository';
import { duplicatedNameError } from '@/errors';

export async function createCourse({ name }: Prisma.CoursesCreateInput): Promise<Courses> {
  await validateUniqueNameOrFail(name);
  return courseRepository.create({
    name,
  });
}

export async function listAllCourses(): Promise<Courses[]>{
    return courseRepository.findAll();
}

async function validateUniqueNameOrFail(name: string) {
  const userWithSameName = await courseRepository.findByName(name);
  if (userWithSameName) {
    throw duplicatedNameError();
  }
}

const courseService = {
  createCourse,
  listAllCourses,
};

export default courseService;

