import {
  getMovieReviewData,
  likeReview,
  postAuthReviewData,
} from "../../models/authReview.model.js";

async function httpPostReview(req, res) {
  const newReview = req.body;
  console.log(req.body);
  if (!newReview.movieid || !newReview.id) {
    return res.status(400).json({
      Error: "Missing review id property",
    });
  }

  await postAuthReviewData(newReview);

  return res.status(201).json(newReview);
}

async function httpGetReview(req, res) {
  const movieid = req.params.movieid;
  const review = await getMovieReviewData(movieid);
  return res.status(200).json(review);
}

async function httpPutLike(req, res) {
  const likeBody = req.body;
  const like = await likeReview(likeBody);
  return res.status(202).json(like);
}
export { httpPostReview, httpGetReview, httpPutLike };
