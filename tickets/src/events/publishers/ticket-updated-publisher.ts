import { Publisher, Subjects, TicketUpdatedEvent } from "@frc-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
