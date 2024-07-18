import express from "express";
import { Top10Router } from "./Top10OnRecobee/Top10.routes.js";
import { RecentReleaseRouter } from "./RecentRelease/RecentRelease.routes.js";
import { PopularReviewRoute } from "./PopularReview/PopularReview.routes.js";
import { searchUnauthRouter } from "./searchUnauth/searchUnauth.routes.js";

const commonApiRouter = express.Router();

commonApiRouter.use("/trending", Top10Router);
commonApiRouter.use("/all/ott", RecentReleaseRouter);
commonApiRouter.use("/review/popular", PopularReviewRoute);
commonApiRouter.use("/search", searchUnauthRouter);

export { commonApiRouter };
