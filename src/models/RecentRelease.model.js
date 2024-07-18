import RecentReleaseDatabase from "./RecenteRelease.mongo.js";
import axios from "axios";

async function populateRecentReleaseMovieData() {
  const response = await axios.get(`${process.env.recentrelease_api}`);

  if (response.status !== 200) {
    console.log("Unable to download data");
    throw new Error("Loading recent release data is failed");
  }

  const recentreleasedata = response.data;

  for (const recentmovie of recentreleasedata) {
    const movie = {
      additiondate: recentmovie.additiondate,
      id: recentmovie.id,
      title: recentmovie.title,
      language: recentmovie.language,
      releasedate: recentmovie.releasedate,
      releasedatetmdb: recentmovie.releasedatetmdb,
      imdbrating: recentmovie.imdbrating,
      arrating: recentmovie.arrating,
      runningtime: recentmovie.runningtime,
      backdropimage: recentmovie.backdropimage,
      posterimage: recentmovie.posterimage,
      posterimageurl: recentmovie.posterimageurl,
      backdropimageurl: recentmovie.backdropimageurl,
      movieimage: recentmovie.movieimage,
      trailerkeytmdb: recentmovie.trailerkeytmdb,
      parentalguidance: recentmovie.parentalguidance,
      votesimdb: recentmovie.votesimdb,
      synopsis: recentmovie.synopsis,
      moviecast: recentmovie.moviecast,
      trailersitetmdb: recentmovie.trailersitetmdb,
      genre: recentmovie.genre,
      director: recentmovie.director,
    };
    await saveRecentReleaseMovieData(movie);
    // console.log(`recentrelase movie id ${movie.id}`);
  }
}

async function LoadRecentReleaseData() {
  const firstMovie = await findMovie({
    id: "153696",
    title: "In Their Own Words",
  });

  if (firstMovie) {
    console.log("Recent Release Movie data is already loaded");
  } else {
    await populateRecentReleaseMovieData();
  }

//   console.log("Downloading recente release data");
}

async function findMovie(filter) {
  //here you have to return the value
  return await RecentReleaseDatabase.findOne(filter);
}

async function getRecentReleaseData() {
  return await RecentReleaseDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveRecentReleaseMovieData(movie) {
  //here always use findOneAndUpdate
  await RecentReleaseDatabase.findOneAndUpdate(
    {
      id: movie.id,
    },
    movie,
    { upsert: true }
  );
}

export { LoadRecentReleaseData, getRecentReleaseData };
