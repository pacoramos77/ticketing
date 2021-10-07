import { Publisher, OrderCancelledEvent, Subjects } from "@frc-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
