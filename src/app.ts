import express from "express";
import controllers from "./contexts/index.context";
const app = express();
const port = 5050;

app.use(controllers);
app.listen(port, () => {
  console.log(`server starts... port${port}`);
});
