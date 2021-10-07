import { Publisher, OrderCreatedEvent, Subjects } from "@frc-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
