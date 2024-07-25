import express from "express";
import { AuthReviewRouter } from "./authReview/authReview.routes.js";

const AuthRouter = express.Router();

AuthRouter.use("/", AuthReviewRouter);

export {AuthRouter}
