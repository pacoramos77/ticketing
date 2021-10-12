import mongoose from "mongoose";
import { Order, OrderStatus } from "../order";
import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 55,
    version: 0,
  });
  const order = Order.build({
    status: OrderStatus.Created,
    expiresAt: new Date(),
    userId: "123",
    ticket,
  });
  await order.save();

  // fetch the order twice
  const firstInstance = await Order.findById(order.id);
  const secondInstance = await Order.findById(order.id);
  // make two separate changes to the orders we fetched
  firstInstance!.set({ status: OrderStatus.AwaitingPayment });
  secondInstance!.set({ status: OrderStatus.Cancelled });
  // save the first fetched order
  await firstInstance!.save();

  try {
    // save the second fetched order and expect an error
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 55,
    version: 0,
  });
  const order = Order.build({
    status: OrderStatus.Created,
    expiresAt: new Date(),
    userId: "123",
    ticket,
  });

  await order.save();
  expect(order.version).toEqual(0);
  await order.save();
  expect(order.version).toEqual(1);
  await order.save();
  expect(order.version).toEqual(2);
});
