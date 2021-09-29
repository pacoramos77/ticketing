import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("Hi signout!!! route");
});

export { router as signoutRouter };
