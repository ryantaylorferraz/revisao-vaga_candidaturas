import { Request, Response } from "express";
import { OpportunityService } from "../services/opportunityService";
import { inject, injectable } from "tsyringe";

@injectable()
export class OpportunityController {
  constructor(
    @inject("OpportunityService") private opportunityService: OpportunityService
  ) {}

  async create(req: Request, res: Response) {
    const id = res.locals.decode.id
    const response = await this.opportunityService.create(req.body, Number(id));

    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response) {
    const id = res.locals.decode?.id
    const response = await this.opportunityService.findMany(id);

    return res.status(200).json(response);
  }

  findOne(req: Request, res: Response) {
    const response = this.opportunityService.findOne(res.locals.opportunity);

    return res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    const response = await this.opportunityService.update(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    await this.opportunityService.delete(Number(req.params.id));
    return res.status(204).json();
  }
}
