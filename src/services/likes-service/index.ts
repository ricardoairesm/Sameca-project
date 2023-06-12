import { Likes } from '@prisma/client';
import { Prisma } from '@prisma/client'
import likesRepository from '@/repositories/likes-repository';

export async function createLike(userId: number, icId: number): Promise<Likes> {
    return likesRepository.create({
        userId,
        icId,
    });
}

export async function listAllIcLikes(icId: number): Promise<Likes[]> {
    return likesRepository.findByIcId(icId);
}

export async function listAllUserLikes(userId: number): Promise<Likes[]> {
    return likesRepository.findByUserId(userId);
}

export async function deleteUserLike(userId: number, icId: number) {
    const like = await likesRepository.findEspecifLike(userId, icId);
    return likesRepository.deleteLike(like.id);
}

const likeService = {
    createLike,
    listAllIcLikes,
    listAllUserLikes,
    deleteUserLike,
};

export default likeService;

