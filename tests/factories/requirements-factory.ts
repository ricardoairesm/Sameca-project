import { prisma } from "@/config";
import { Requirements } from "@prisma/client";

export async function createRequirement(params: Partial<Requirements> = {}): Promise<Requirements> {
    const CoursesId = params.CoursesId;
    const ICSId = params.ICSId;
    return prisma.requirements.create({
        data: {
            CoursesId,
            ICSId,
        }
    })
}