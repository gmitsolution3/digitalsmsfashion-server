import { Router } from "express";
import {
  assignCourier,
  getCourierStatusForOrder,
} from "../controllers/courier.controller";

const router = Router();

router.post("/assign", assignCourier);

router.get("/order-status/:orderId", getCourierStatusForOrder);

export default router;
