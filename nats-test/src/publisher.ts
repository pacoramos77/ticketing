import nats from "node-nats-streaming";
import EventEmitter from "events";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({ id: "1234", title: "concert", price: 25 });
  } catch (err) {
    console.log(err);
  }

  // const data = JSON.stringify({
  //   id: "12345",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
