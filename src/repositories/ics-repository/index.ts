import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function listAll() {
  return prisma.iCs.findMany();
}

async function findById(id:number, select?: Prisma.ICsSelect) {
  return prisma.iCs.findFirst({
    where: { id },
  });
}

async function create(data: any) {
  return prisma.iCs.create({
    data,
  });
}

const icsRepository = {
  listAll,
  create,
  findById,
};

export default icsRepository;
