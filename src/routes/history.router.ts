import { Router } from "express";
import { historyController } from "../controllers/history.controller";
import { historyValidator } from "../middlewares/history.validator";

const historyRouter = Router();

historyRouter.get("/history",historyValidator, historyController);

export { historyRouter }