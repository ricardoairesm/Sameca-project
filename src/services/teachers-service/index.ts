import { Teachers, Users } from '@prisma/client';
import { Prisma } from '@prisma/client'
import { duplicatedNameError } from '@/errors';
import teacherRepository from '@/repositories/teacher-repository';

export async function createTeacher(name: string): Promise<Teachers> {
  await validateUniqueNameOrFail(name);
  return teacherRepository.create({
    name,
  });
}

async function validateUniqueNameOrFail(name: string) {
  const teacherWithSameName = await teacherRepository.findByName(name);
  if (teacherWithSameName) {
    throw duplicatedNameError();
  }
}

async function listTeachers() {
  return teacherRepository.listAllTeachers();
}

const teacherService = {
  createTeacher,
  listTeachers,
};

export default teacherService;

