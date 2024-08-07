import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/userService";
import { UserController } from "../controllers/userController";
import { validBody } from "../middlewares/validBody.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/userSchema";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router()

container.registerSingleton("UserService", UserServices)
const userController = container.resolve(UserController)

userRouter.post("/login", validBody.execute(userLoginBodySchema) , (req, res) => userController.login(req, res))
userRouter.post("/register", validBody.execute(userRegisterBodySchema), (req, res) => userController.register(req, res))

userRouter.get("/", ValidateToken.execute, (req, res) => userController.getUser(req, res))


