import { prisma } from "@/config";
import { ICs } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createIc(params:Partial<ICs> = {}):Promise<ICs>{
    const name = params.name || faker.name.findName();
    const description = params.description || faker.lorem.lines();
    const image = params.image || faker.image.city();
    const gratification = "sim";
    const gratificationSpots = 2;
    const teacherId = params.teacherId;
    return prisma.iCs.create({
        data:{
            name,
            description,
            image,
            gratification,
            gratificationSpots,
            teacherId,
        }
    })
}