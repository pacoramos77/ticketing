import express from "express";

const app = express();

app.use(express.json());

app.get("/api/users/currentuser", (que, res) => {
  res.send("Hi!!!");
});

app.listen(3000, () => {
  console.log("Listing on port 3000");
});
