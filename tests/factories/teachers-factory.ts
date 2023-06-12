import { prisma } from "@/config";
import { Teachers } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createTeacher(params:Partial<Teachers> = {}):Promise<Teachers>{
    const incomingName = params.name || faker.name.findName();
    return prisma.teachers.create({
        data:{
            name:incomingName
        }
    })
}