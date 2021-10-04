import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@frc-tickets/common";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as deleteOrderRouter };
