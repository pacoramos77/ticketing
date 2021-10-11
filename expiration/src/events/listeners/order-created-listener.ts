import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@frc-tickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    expirationQueue.add({
      orderId: data.id,
    });
    msg.ack();
  }
}
