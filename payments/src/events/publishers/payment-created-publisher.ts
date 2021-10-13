import { PaymentCreatedEvent, Publisher, Subjects } from "@frc-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
