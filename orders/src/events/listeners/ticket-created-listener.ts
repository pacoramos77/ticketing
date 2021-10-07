import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@frc-tickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(
    { id, title, price }: TicketCreatedEvent["data"],
    msg: Message
  ) {
    const ticket = await Ticket.build({ id, title, price });
    ticket.save();
    msg.ack();
  }
}
