import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@frc-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
    });
    console.log(data, order);
    await order.save();

    console.log("done");

    msg.ack();
  }
}
