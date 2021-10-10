import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 25,
  });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  const userOne = global.signin();
  const userTwo = global.signin();

  // Create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  // Create one order as user #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create one order as user #2

  const { body: orderOneUserTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const { body: orderTwoUserTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make request to get orders for user #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .send()
    .expect(200);

  // Make sure we only got the orders for user #2
  expect(response.body).toHaveLength(2);
  expect(response.body[0].id).toBe(orderOneUserTwo.id);
  expect(response.body[1].id).toBe(orderTwoUserTwo.id);
  expect(response.body[0].ticket.id).toBe(ticketTwo.id);
  expect(response.body[1].ticket.id).toBe(ticketThree.id);
});
