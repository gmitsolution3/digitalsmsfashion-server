import { Router } from "express";
import {
  CreateOrder,
  dashboardAnalyticsController,
  getOrderById,
  historyController,
  orderController,
  updateOrder,
} from "../controllers/createOrder.controller";

const router = Router();

router.post("/", CreateOrder);
router.get("/all-product", orderController);
router.get("/dashboard-analytics", dashboardAnalyticsController);
router.get("/get-history/:id", historyController);
router.get("/get-Order/:id", getOrderById);
router.put("/update-order/:id", updateOrder);

export default router;
