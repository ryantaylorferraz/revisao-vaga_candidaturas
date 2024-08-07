import "express-async-errors"
import cors from "cors"
import "dotenv/config"
import "reflect-metadata"
import express, { json } from "express";
import helmet from "helmet";
import { OpportunityRouter } from "./routers/opportunityRouter";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routers/userRouter";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/opportunities", OpportunityRouter)
app.use("/users", userRouter)

app.use(HandleErrors.execute)
