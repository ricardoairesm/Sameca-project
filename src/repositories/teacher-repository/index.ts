import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByName(name:string) {
  return prisma.teachers.findFirst({
    where: { name },
  });
}

async function create(data: any) {
  return prisma.teachers.create({
    data,
  });
}

async function listAllTeachers() {
    return prisma.teachers.findMany()
}

const teacherRepository = {
  create,
  findByName,
  listAllTeachers,
};

export default teacherRepository;
