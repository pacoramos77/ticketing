import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi currentUser!!! route");
});

export { router as currentUserRouter };
