import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "title",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const createdResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title updated",
      price: 20.1,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const createdResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const createdResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 20.2,
    })
    .expect(200);

  const response = await request(app)
    .get(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.title).toBe("new title");
  expect(response.body.price).toBe(20.2);
});

it("publishes an event", async () => {
  const cookie = global.signin();
  const createdResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 20.2,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
it("rejects updates if the ticket is reserved", async () => {
  const cookie = global.signin();
  const createdResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20,
    })
    .expect(201);

  const ticket = await Ticket.findById(createdResponse.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${createdResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 20.2,
    })
    .expect(400);
});
