import { Prisma, Sessions } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.SessionsCreateManyInput) {
  return prisma.sessions.create({
    data,
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
