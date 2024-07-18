import mongoose from "mongoose";

const AllMoviesMongoose = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  movieid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imdbid: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  parentalguidance: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isseries: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  trailerkeytmdb: {
    type: String,
    required: true,
  },
  trailersitetmdb: {
    type: String,
    required: true,
  },
  arrating: {
    type: Number,
    required: true,
  },
  runningtime: {
    type: Number,
    required: true,
  },
  movieimage: {
    type: String,
    required: true,
  },
  releasedate: {
    type: String,
    required: true,
  },
  imdbrating: {
    type: Number,
    required: true,
  },
  posterimage: {
    type: String,
    required: true,
  },
  posterimageurl: {
    type: String,
    required: true,
  },
  backdropimage: {
    type: String,
    required: true,
  },
  backdropimageurl: {
    type: String,
    required: true,
  },
  moviecast: {
    type: String,
    required: true,
  },
});

export default mongoose.model("AllMovies", AllMoviesMongoose);
