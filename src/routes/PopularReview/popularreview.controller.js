import { getPopularReviewData } from "../../models/PopularReview.model.js";

async function httpGetPopularReviewData(req, res) {
  return res.status(200).json(await getPopularReviewData());
}

export { httpGetPopularReviewData };
