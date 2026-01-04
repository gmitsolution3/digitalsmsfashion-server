import { Request, Response } from "express";
import { CreateOrderService } from "../services/createOrder.service";

export const CreateOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  if (!orderData) {
    return res.status(500).json({
      success: false,
      message: "body data not found",
    });
  }

  try {
    const result = await CreateOrderService(orderData);

    res.status(201).send(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      data: err,
    });
  }
};
