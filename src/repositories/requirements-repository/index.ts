import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByIcId(ICSId:number, select?: Prisma.RequirementsSelect) {
  return prisma.requirements.findMany({
    where: { ICSId },
  });
}

async function create(data:any) {
  return prisma.requirements.create({
    data,
  });
}

async function deleteRequirement(id:number){
  return prisma.requirements.delete({
    where:{
      id
    },
  })
}

const requirementsRepository = {
  findByIcId,
  create,
  deleteRequirement,
};

export default requirementsRepository;
