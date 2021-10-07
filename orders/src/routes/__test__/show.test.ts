import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns an error if one user tries to fetch not found order", async () => {
  await request(app)
    .get(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("returns an error if one user tries to fetch another users order", async () => {
  const user = global.signin();

  // Create a ticket
  const ticket = Ticket.build({ title: "concert", price: 25 });
  await ticket.save();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("fetches orders for a particular user", async () => {
  const user = global.signin();

  // Create a ticket
  const ticket = Ticket.build({ title: "concert", price: 25 });
  await ticket.save();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toBe(order.id);
  expect(fetchedOrder.title).toBe(order.title);
  expect(fetchedOrder.price).toBe(order.price);
});
