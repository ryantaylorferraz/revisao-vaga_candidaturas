import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/userService";
import { Request, Response } from "express";

@injectable()
export class UserController {
    constructor(@inject( "UserService") private userService: UserServices) {}
    public register = async (req: Request, res: Response) => {
        const response = await this.userService.register(req.body)

        return res.status(201).json(response)
    }
    public login = async (req: Request, res: Response) => {
        const response = await this.userService.login(req.body)

        return res.status(200).json(response)
    }
    public getUser = async (req: Request, res: Response) => {
        const id = res.locals.decode.id;
        const response = await this.userService.getUser(id);

        return res.status(200).json(response) 
    }
}