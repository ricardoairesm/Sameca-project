import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UsersSelect) {
  return prisma.users.findFirst({
    where: { email },
  });
}

async function findById(id:number, select?: Prisma.UsersSelect) {
  return prisma.users.findFirst({
    where: { id },
  });
}

async function create(data: Prisma.UsersCreateInput) {
  return prisma.users.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  findById,
};

export default userRepository;
