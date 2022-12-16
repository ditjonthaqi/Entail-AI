import { Router } from "express";
import { crawController } from "../controllers/craw.controller";
import { crawValidator } from "../middlewares/craw.validator";

const crawRotuer = Router();

crawRotuer.get("/craw", crawValidator, crawController);


export { crawRotuer }