import { Request, Response } from 'express';
import httpStatus from 'http-status';
import icsService from '@/services/ics-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function icsPost(req: AuthenticatedRequest, res: Response) {
    const { name, description, image, gratification, gratificationSpots, teacherId } = req.body;
    try {
        const ic = await icsService.createIc({ name, description, image, gratification, gratificationSpots, teacherId });
        return res.status(httpStatus.CREATED).json({
            id: ic.id,
            name: ic.name,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function listIcs(req: AuthenticatedRequest, res: Response) {
    try {
        const ics = await icsService.listAllIcs();
        return res.status(httpStatus.OK).send(ics);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function getIcById(req: AuthenticatedRequest, res: Response) {
    const icId = req.params.icId
    try {
        const ic = await icsService.getIcById(Number(icId));
        return res.status(httpStatus.OK).send(ic);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}
