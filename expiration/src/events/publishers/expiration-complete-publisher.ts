import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@frc-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
