import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
} from "@frc-tickets/common";
import { Order, OrderStatus } from "../models/order";
import { Ticket, TicketDoc } from "../models/ticket";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) throw new NotFoundError();

    if (order.userId != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    order.save();

    // publishing an event saying this was cancelled!

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
