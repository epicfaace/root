import { Request, Response } from 'express';
import { getApplicationAttribute, setApplicationAttribute } from "./common";
import { IApplication } from '../models/Application.d';

export function getHardwareInfo(req: Request, res: Response) {
    return getApplicationAttribute(req, res, (e: IApplication) => {
        return e.forms.hardware_info || {};
    }, true);
}

export function setHardwareInfo(req: Request, res: Response) {
    return setApplicationAttribute(req, res,
        (e: IApplication) => {
            e.forms.hardware_info = req.body;
        },
        e => e.forms.hardware_info
    );
} 