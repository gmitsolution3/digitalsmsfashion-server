import { Request, Response } from "express";
import {
  createBkashPayment,
  executeBkashPayment,
} from "../services/payment.service";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, orderId } = req.body;

    const payment = await createBkashPayment(
      amount,
      `INV-${orderId}`,
    );

    res.status(201).json({
      success: true,
      message: "Payment Created!",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to make payment",
    });
  }
};

export const executePayment = async (req: Request, res: Response) => {
  try {
    const { paymentID } = req.body;

    const result = await executeBkashPayment(res, paymentID);

    res.status(200).json({
      success: true,
      message: "Payment executed!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to execute payment",
    });
  }
};
