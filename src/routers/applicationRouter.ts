import { Router } from "express";
import { ApplicationController } from "../controllers/applicationController";
import { validBody } from "../middlewares/validBody.middleware";
import { applicationCreateSchema } from "../schemas/applicationSchema";
import { container } from "tsyringe";
import { ApplicationService } from "../services/applicationService";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const ApplicationRouter = Router()

container.registerSingleton("ApplicationService", ApplicationService)
const applicationController = container.resolve(ApplicationController)

ApplicationRouter.post("/:id/applications", validBody.execute(applicationCreateSchema), (req, res) => applicationController.create(req, res))

ApplicationRouter.get("/:id/applications", ValidateToken.execute, (req, res) => applicationController.findMany(req, res))