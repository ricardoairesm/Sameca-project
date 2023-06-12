import { Requirements } from '@prisma/client';
import { Prisma } from '@prisma/client'
import requirementsRepository from '@/repositories/requirements-repository';

export async function createRequirement(courseId: number, icId: number): Promise<Requirements> {
    return requirementsRepository.create({
        CoursesId:courseId,
        ICSId:icId,
    });
}

export async function deleteRequirement(id: number): Promise<Requirements> {
    return requirementsRepository.deleteRequirement(id);
}

export async function listAllIcRequirements(ICSId: number): Promise<Requirements[]> {
    return requirementsRepository.findByIcId(ICSId)
}

const requirementService = {
    createRequirement,
    deleteRequirement,
    listAllIcRequirements,
};

export default requirementService;

