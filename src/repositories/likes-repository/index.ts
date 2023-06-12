import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByIcId(icId: number, select?: Prisma.UsersSelect) {
  return prisma.likes.findMany({
    where: { icId },
  });
}

async function findByUserId(userId: number) {
  return prisma.likes.findMany({
    where: { userId },
  });
}

async function findEspecifLike(userId:number, icId:number){
  return prisma.likes.findFirst({
    where:{
      icId,
      userId,
    },
  })
}

async function create(data: any) {
  return prisma.likes.create({
    data,
  });
}

async function deleteLike(id: number) {
  return prisma.likes.delete({
    where: {
      id
    },
  });
}

const likesRepository = {
  findByIcId,
  findByUserId,
  findEspecifLike,
  create,
  deleteLike,
};

export default likesRepository;
