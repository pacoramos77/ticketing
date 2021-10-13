import { Listener, PaymentCreatedEvent, Subjects } from "@frc-tickets/common";
import { Message } from "node-nats-streaming";
import { Order, OrderStatus } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: { id: string; orderId: string; stripeId: string; }, msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}