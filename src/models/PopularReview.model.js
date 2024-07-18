import PopularReviewDatabase from "./PopularReview.mongo.js";
import axios from "axios";

async function populatePopularReviewData() {
  const response = await axios.get(`${process.env.popularreview_api}`);

  if (response.status !== 200) {
    console.log("Unable to download popular review");
    throw new Error("Popular review data download is failed");
  }

  const popularreviewdata = response.data;
  console.log(popularreviewdata);

  for (const popularreview of popularreviewdata) {
    const movie = {
      movieid: popularreview.movieid,
      id: popularreview.id,
      moviename: popularreview.moviename,
      reviewcomment: popularreview.reviewcomment,
      reviewrating: popularreview.reviewrating,
      reviewtitle: popularreview.reviewtitle,
      ratingstory: popularreview.ratingstory,
      ratingvisuals: popularreview.ratingvisuals,
      ratingmusic: popularreview.ratingmusic,
      ratingdirection: popularreview.ratingdirection,
      ratingacting: popularreview.ratingacting,
      hasspoilers: popularreview.hasspoilers,
      familyfriendly: popularreview.familyfriendly,
      username: popularreview.username,
      datetime: popularreview.datetime,
      likes: popularreview.likes,
      comments: popularreview.comments,
      dislikes: popularreview.dislikes,
      posterimageurl: popularreview.posterimageurl,
      posterimage: popularreview.posterimage,
      backdropimageurl: popularreview.backdropimageurl,
      backdropimage: popularreview.backdropimage,
      imdbrating: popularreview.imdbrating,
      language: popularreview.language,
      parentalguidance: popularreview.parentalguidance,
      synopsis: popularreview.synopsis,
      isseries: popularreview.isseries,
      director: popularreview.director,
      country: popularreview.country,
      arrating: popularreview.arrating,
      runningtime: popularreview.runningtime,
      movieimage: popularreview.movieimage,
      releasedate: popularreview.releasedate,
      moviecast: popularreview.moviecast,
      avgratingstory: popularreview.avgratingstory,
      avgratingvisuals: popularreview.avgratingvisuals,
      avgratingmusic: popularreview.avgratingmusic,
      avgratingdirection: popularreview.avgratingdirection,
      avgratingacting: popularreview.avgratingacting,
      postid: popularreview.postid,
    };

    await savePopularReviewData(movie);
    console.log(`movieid ${movie.id}`);
  }
}

async function loadPopularReviewdata() {
  const firstMovie = await findMovie({
    id: "192346",
    moviename: "A Quiet Place: Day One",
  });

  if (firstMovie) {
    console.log("Popular Review Movie data is already loaded");
  } else {
    await populatePopularReviewData();
  }
}

async function findMovie(filter) {
  return await PopularReviewDatabase.findOne(filter);
}

async function getPopularReviewData() {
  return await PopularReviewDatabase.find({}, { _id: 0, __v: 0 });
}

async function savePopularReviewData(movie) {
  await PopularReviewDatabase.findOneAndUpdate(
    {
      id: movie.id,
    },
    movie,
    { upsert: true }
  );
}

export { loadPopularReviewdata, getPopularReviewData };
