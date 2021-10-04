import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = "payments-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(
      "Event data",
      msg.getSequence(),
      data.id,
      data.title,
      data.price
    );
    msg.ack();
  }
}
