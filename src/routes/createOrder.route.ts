import { Router } from "express";
import { CreateOrder } from "../controllers/createOrder.controller";

const router = Router();

router.post("/", CreateOrder);

export default router;
