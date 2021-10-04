import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Subscriber connected to NATS");

  stan.on("close", () => {
    console.log("NATS Connection close!");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => {
  console.log("SIGINT");
  stan.close();
});
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  stan.close();
});
