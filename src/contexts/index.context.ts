import { Router } from "express";
import accountsController from "./accounts/accounts.controller";

const controllers = Router();

controllers.get("/health-check", (_, res) => {
  res.status(200).send();
});

controllers.use("/accounts", accountsController);
export default controllers;
