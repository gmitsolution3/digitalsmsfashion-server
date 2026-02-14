import { Router } from "express";
import {
  createPayment,
  executePayment,
} from "../controllers/payment.controller";

const router = Router();

router.post("/create-payment", createPayment);

router.post("/execute-payment", executePayment);

export default router;