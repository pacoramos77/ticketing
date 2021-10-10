import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@frc-tickets/common";

import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

async function setup() {
  // creates an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 10,
  });
  await ticket.save();

  // create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    price: 11.1,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  const msg: Message = {
    ack: jest.fn(),
  } as any;

  return { listener, ticket, data, msg };
}

it("finds, updates and saves a ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  // call the onMessage finction with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was updated!
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has skiped version number", async () => {
  const { listener, data, msg } = await setup();

  data.version = 10;
  expect.hasAssertions();
  try {
    await listener.onMessage(data, msg);
  } catch (err) {
    expect(msg.ack).not.toHaveBeenCalled();
  }
});
