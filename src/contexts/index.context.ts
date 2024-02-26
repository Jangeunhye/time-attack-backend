import { Router } from "express";

const controllers = Router();

controllers.get("/health-check", (_, res) => {
  res.status(200).send();
});

export default controllers;
