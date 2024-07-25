import express from "express";

import {
  httpPostReview,
  httpGetReview,
  httpPutLike,
} from "./authReview.controller.js";
import { authenticate } from "../auth.middleware.js";

const AuthReviewRouter = express.Router();

AuthReviewRouter.post(
  "/recommendation/review/new",
  authenticate,
  httpPostReview
);
AuthReviewRouter.get(
  "/recommendation/review/:movieid",
  authenticate,
  httpGetReview
);
AuthReviewRouter.put("/recommendation/0/like/new", authenticate, httpPutLike);

export { AuthReviewRouter };
