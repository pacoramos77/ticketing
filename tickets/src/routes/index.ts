import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const route = express.Router();

route.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  res.send(tickets);
});

export { route as indexTicketsRouter };
