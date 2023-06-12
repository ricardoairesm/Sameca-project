import { ICs } from '@prisma/client';
import icsRepository from '@/repositories/ics-repository';

export async function createIc({ name, description, image, gratification, gratificationSpots, teacherId }: any): Promise<ICs> {
    return icsRepository.create({
        name,
        description,
        image,
        gratification,
        gratificationSpots,
        teacherId,
    });
}

export async function listAllIcs(): Promise<ICs[]> {
    return icsRepository.listAll();
}

export async function getIcById(icId: number) {
    return icsRepository.findById(icId)
}



const icsService = {
    createIc,
    listAllIcs,
    getIcById,
};

export default icsService;

