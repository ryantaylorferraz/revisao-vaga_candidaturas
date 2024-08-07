import { Router } from "express";
import { OpportunityController } from "../controllers/opportunityController";
import { ApplicationRouter } from "./applicationRouter";
import { validBody } from "../middlewares/validBody.middleware";
import { opportunityCreateSchema } from "../schemas/opportunitySchema";
import { IsOpportunityIdValid } from "../middlewares/isOpportunityIdValid.middleware";
import { container } from "tsyringe";
import { OpportunityService } from "../services/opportunityService";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { IsOpportunityOwner } from "../middlewares/isOpportunityOwner.middleware";


export const OpportunityRouter = Router()

container.registerSingleton("OpportunityService", OpportunityService)
const opportunityController = container.resolve(OpportunityController)

OpportunityRouter.post("/", ValidateToken.execute, validBody.execute(opportunityCreateSchema) , (req, res) => opportunityController.create(req, res))

OpportunityRouter.get("/", (req, res) => opportunityController.findMany(req, res))

OpportunityRouter.get("/user", ValidateToken.execute, (req, res) => opportunityController.findMany(req, res))

OpportunityRouter.use("/:id", IsOpportunityIdValid.execute)
OpportunityRouter.get("/:id", ValidateToken.execute, IsOpportunityOwner.execute, (req, res) => opportunityController.findOne(req, res))

OpportunityRouter.patch("/:id", ValidateToken.execute, IsOpportunityOwner.execute, (req, res) => opportunityController.update(req, res))

OpportunityRouter.delete("/:id", ValidateToken.execute, IsOpportunityOwner.execute, (req, res) => opportunityController.delete(req, res))

OpportunityRouter.use("/", ApplicationRouter)
