import mongoose from "mongoose";

const RecentReleaseMongo = new mongoose.Schema({
  additiondate: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  releasedate: {
    type: String,
    required: true,
  },
  releasedatetmdb: {
    type: String,
    required: true,
  },
  imdbrating: {
    type: Number,
    required: true,
  },
  arrating: {
    type: String,
    required: true,
  },
  runningtime: {
    type: String,
    required: true,
  },
  backdropimage: {
    type: String,
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
  backdropimageurl: {
    type: String,
    required: true,
  },
  movieimage: {
    type: String,
    required: true,
  },
  trailerkeytmdb: {
    type: String,
    required: true,
  },
  parentalguidance: {
    type: String,
    required: true,
  },
  votesimdb: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  moviecast: {
    type: String,
    required: true,
  },
  trailersitetmdb: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
});


export default mongoose.model("Recent-Release",RecentReleaseMongo);