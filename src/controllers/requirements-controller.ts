import { Request, Response } from 'express';
import httpStatus from 'http-status';
import requirementService from '@/services/requirements-service';

export async function requirementPost(req: Request, res: Response) {
    const { courseId, icId } = req.body;
    try {
        const requirement = await requirementService.createRequirement(Number(courseId), Number(icId));
        return res.status(httpStatus.CREATED).json({
            id: requirement.id,
            courseId: requirement.CoursesId,
            icId: requirement.ICSId,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function listIcRequirements(req: Request, res: Response) {
    const icId = req.params.icId;
    try {
        const requirements = await requirementService.listAllIcRequirements(Number(icId))
        return res.status(httpStatus.OK).send(requirements);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function deleteRequirement(req: Request, res: Response) {
    const id = req.params.requirementId;
    try {
        const requirement = await requirementService.deleteRequirement(Number(id));
        return res.status(httpStatus.OK).json({
            id: requirement.id,
            courseId: requirement.CoursesId,
            icId: requirement.ICSId,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}