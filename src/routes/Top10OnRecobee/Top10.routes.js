import express from "express";

const Top10Router = express.Router();

import { httpgetTop10 } from "./Top10.controller.js";
import { authenticate } from "../auth.middleware.js";

Top10Router.get("/", authenticate, httpgetTop10);

export { Top10Router };
