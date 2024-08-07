import { Request, Response } from "express";
import { ApplicationService } from "../services/applicationService";
import { inject, injectable } from "tsyringe";

@injectable()
export class ApplicationController{
    constructor(@inject("ApplicationService") private applicationService: ApplicationService) {}

    async create(req: Request, res: Response){

        const response = await this.applicationService.create(Number(req.params.id), req.body)
        return res.status(201).json(response)
    }
    
    async findMany(req: Request, res: Response) {

        const response = await this.applicationService.findMany(Number(req.params.id))

        return res.status(200).json(response)
    }
}