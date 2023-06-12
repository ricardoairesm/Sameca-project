import { prisma } from "@/config";
import { Courses } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createCourses(params:Partial<Courses> = {}):Promise<Courses>{
    const incomingName = params.name || faker.name.findName();
    return prisma.courses.create({
        data:{
            name:incomingName
        }
    })
}