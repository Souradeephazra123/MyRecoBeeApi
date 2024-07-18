import Top10MongoDataBase from "./Top10.mongo.js";

import axios from "axios";

async function populateTop10MovieData() {
  const response = await axios.get(`${process.env.Top10_API}`);

  if (response.status !== 200) {
    console.log("Problem Downloading Data");
    throw new Error("Top10 Movie data download failed");
  }

  const Top10OnRecobeeMovieData = response.data;

  for (const top10movie of Top10OnRecobeeMovieData) {
    const movie = {
      id: top10movie.id,
      title: top10movie.title,
      releasedate: top10movie.releasedate,
      releasedatetmdb: top10movie.releasedatetmdb,
      imdbrating: top10movie.imdbrating,
      arrating: top10movie.arrating,
      runningtime: top10movie.runningtime,
      backdropimage: top10movie.backdropimage,
      posterimage: top10movie.posterimage,
      posterimageurl: top10movie.posterimageurl,
      backdropimageurl: top10movie.backdropimageurl,
      movieimage: top10movie.movieimage,
      trailerkeytmdb: top10movie.trailerkeytmdb,
      parentalguidance: top10movie.parentalguidance,
      rtrating: top10movie.rtrating,
      synopsis: top10movie.synopsis,
      moviecast: top10movie.moviecast,
      trailersitetmdb: top10movie.trailersitetmdb,
      genre: top10movie.genre,
    };

    await saveMovieData(movie);
    // console.log(`Movie id ${movie.id}`);
  }
}

async function LoadTop10MovieData() {
  //finding first movie
  const firstMovie = await findMovie({
    id: "268402",
    title: "Kingdom of the Planet of the Apes",
  });

  if (firstMovie) {
    console.log("top10onrecobee Movie data is already loaded");
  } else {
    await populateTop10MovieData();
  }

  // console.log("Downloading data...");
}

//filter
async function findMovie(filter) {
    //you have to return data
  return await Top10MongoDataBase.findOne(filter);
}

async function saveMovieData(movie) {
  await Top10MongoDataBase.findOneAndUpdate(
    {
      id: movie.id,
    },
    movie,
    { upsert: true }
  );
}

async function getTop10Movie() {
  return await Top10MongoDataBase.find({}, { _id: 0, __v: 0 });
}

export { LoadTop10MovieData, getTop10Movie };
