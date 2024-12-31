import { Request, Response } from 'express';
import { getApplicationAttribute, setApplicationAttribute } from "./common";
import { IApplication } from '../models/Application.d';

export function getCheckInInfo(req: Request, res: Response) {
    return getApplicationAttribute(req, res, (e: IApplication) => {
        return e.forms.check_in_info || {};
    }, true);
}

export function setCheckInInfo(req: Request, res: Response) {
    return setApplicationAttribute(req, res,
        (e: IApplication) => {
            e.forms.check_in_info = req.body;
        },
        e => e.forms.check_in_info
    );
}