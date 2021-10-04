import request from "supertest";

import { app } from "../../app";

const creaateTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "ticket 1",
    price: 20,
  });
};
it("can fetch a list of tickets", async () => {
  await creaateTicket();
  await creaateTicket();
  await creaateTicket();
  const response = await request(app)
    .get("/api/tickets")
    .send({
      title: "ticket 1",
      price: 20,
    })
    .expect(200);

  expect(response.body).toHaveLength(3);
});
