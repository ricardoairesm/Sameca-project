import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findAll() {
  return prisma.courses.findMany();
}

async function findByName(name:string) {
  return prisma.courses.findFirst({
    where: { name },
  });
}

async function create(data: Prisma.CoursesCreateInput) {
  return prisma.courses.create({
    data,
  });
}

const courseRepository = {
  findAll,
  create,
  findByName,
};

export default courseRepository;
