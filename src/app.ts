import "express-async-errors";
import express from "express";
import routes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use(routes)

export default app;
