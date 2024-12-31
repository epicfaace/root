import { Request, Response } from 'express';
import { getApplicationAttribute, setApplicationAttribute } from "./common";
import { IApplication } from '../models/Application.d';

export function getMealInfo(req: Request, res: Response) {
    return getApplicationAttribute(req, res, (e: IApplication) => {
        return e.forms.meal_info || {};
    }, true);
}

export function setMealInfo(req: Request, res: Response) {
    return setApplicationAttribute(req, res,
        (e: IApplication) => {
            e.forms.meal_info = req.body;
        },
        e => e.forms.meal_info
    );
}
