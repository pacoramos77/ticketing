import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketCreatedEvent } from "@frc-tickets/common";

import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

function setup() {
  // creates an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake message object
  const msg: Message = {
    ack: jest.fn(),
  } as any;

  return { listener, data, msg };
}

it("creates and saves a ticket", async () => {
  const { listener, data, msg } = setup();

  // call the onMessage finction with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was created!
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = setup();
  // call the onMessage finction with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
