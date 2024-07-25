import express from "express";
import cors from "cors";
import morgan from "morgan";
import { commonApiRouter } from "./routes/commonApi.js";
import { authRouter } from "./routes/auth.js";
import { AuthRouter } from "./routes/authAPI.js";
const app = express();

//middleware

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    //   credentials: true,
  })
);

app.use(morgan("combined"));

//converting into json
app.use(express.json());

//using common api
app.use("/common", commonApiRouter);
//auth
app.use("/", authRouter);

app.use("/",AuthRouter)

export { app };
