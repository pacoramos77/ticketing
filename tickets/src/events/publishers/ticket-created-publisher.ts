import { Publisher, Subjects, TicketCreatedEvent } from "@frc-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
