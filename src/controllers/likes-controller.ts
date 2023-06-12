import { Request, Response } from 'express';
import httpStatus from 'http-status';
import likeService from '@/services/likes-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function likesPost(req: AuthenticatedRequest, res: Response) {
    const { userId, icId } = req.body;
    try {
        const like = await likeService.createLike(userId, icId);
        return res.status(httpStatus.CREATED).json({
            id: like.id,
            userId: like.userId,
            icId: like.icId,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function listUserLikes(req: AuthenticatedRequest, res: Response) {
    const userId = req.params.userId;
    try {
        const likes = await likeService.listAllUserLikes(Number(userId))
        return res.status(httpStatus.OK).send(likes);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function listIcLikes(req: AuthenticatedRequest, res: Response) {
    const icId = req.params.icId;
    try {
        const likes = await likeService.listAllIcLikes(Number(icId))
        return res.status(httpStatus.OK).send(likes);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function unlikePost(req: AuthenticatedRequest, res: Response) {
    const { userId, icId } = req.body;
    try {
        const like = await likeService.deleteUserLike(userId, icId);
        return res.status(httpStatus.OK).json({
            id: like.id,
            userId: like.userId,
            icId: like.icId,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}