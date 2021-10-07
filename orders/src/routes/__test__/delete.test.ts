import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error if one user tries to delete a not found order", async () => {
  await request(app)
    .delete(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("returns an error if one user tries to delete another users order", async () => {
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
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("marks an order as cancelled", async () => {
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
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
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
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
