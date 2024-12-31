import { Request, Response } from 'express';
import { getApplicationAttribute } from "./common";
import { IApplication } from '../models/Application.d';

export function getAllForms(req: Request, res: Response) {
    return getApplicationAttribute(req, res, (e: IApplication) => {
        return e.forms || {};
    }, true);
} 