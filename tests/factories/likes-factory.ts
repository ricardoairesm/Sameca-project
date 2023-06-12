import { prisma } from "@/config";
import { Likes } from "@prisma/client";

export async function createLike(params:Partial<Likes> = {}):Promise<Likes>{
    const userId = params.userId;
    const icId = params.icId;
    return prisma.likes.create({
        data:{
            userId,
            icId,
        }
    })
}