import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@frc-tickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  readonly queueGroupName = queueGroupName;

  async onMessage(event: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(event);
    if (!ticket) throw new Error("Ticket not found");

    const { title, price, version } = event;
    ticket.set({ title, price, version });
    await ticket.save();

    msg.ack();
  }
}
