import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  BadRequestError,
} from "@frc-tickets/common";
import { Order, OrderStatus } from "../models/order";
import { Ticket, TicketDoc } from "../models/ticket";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );
  res.send(orders);
});

export { router as indexOrderRouter };
