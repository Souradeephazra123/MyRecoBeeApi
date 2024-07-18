import mongoose from "mongoose";

const PopularReviewMongo = new mongoose.Schema({
  movieid: {
    type:String,
    required:true
  },
  id: {
    type:String,
    required:true
  },
  moviename: {
    type:String,
    required:true
  },
  reviewcomment: {
    type:String,
    required:true
  },
  reviewrating: {
    type:String,
    required:true
  },
  reviewtitle: {
    type:String,
    required:true
  },
  ratingstory: {
    type:String,
    required:true
  },
  ratingvisuals: {
    type:String,
    required:true
  },
  ratingmusic: {
    type:String,
    required:true
  },
  ratingdirection: {
    type:String,
    required:true
  },
  ratingacting: {
    type:String,
    required:true
  },
  hasspoilers: {
    type:String,
    required:true
  },
  familyfriendly: {
    type:String,
    required:true
  },
  username: {
    type:String,
    required:true
  },
    
  datetime: {
    type:String,
    required:true
  },
  likes: {
    type:String,
    required:true
  },
  comments: {
    type:String,
    required:true
  },
  dislikes: {
    type:String,
    required:true
  },
  posterimageurl:{
    type:String,
    required:true
  },
  posterimage: {
    type:String,
    required:true
  },
  backdropimageurl:{
    type:String,
    required:true
  },
  backdropimage: {
    type:String,
    required:true
  },
  imdbrating: {
    type:String,
    required:true
  },
  language: {
    type:String,
    required:true
  },
  parentalguidance: {
    type:String,
    required:true
  },
  synopsis:
   {
    type:String,
    required:true
  },
  isseries: {
    type:String,
    required:true
  },
  director: {
    type:String,
    required:true
  },
  country: {
    type:String,
    required:true
  },
  arrating: {
    type:String,
    required:true
  },
  runningtime: {
    type:String,
    required:true
  },
  movieimage:
  {
    type:String,
    required:true
  },
  releasedate: {
    type:String,
    required:true
  },
  moviecast:
  {
    type:String,
    required:true
  },
  avgratingstory: {
    type:String,
    required:true
  },
  avgratingvisuals: {
    type:String,
    required:true
  },
  avgratingmusic: {
    type:String,
    required:true
  },
  avgratingdirection: {
    type:String,
    required:true
  },
  avgratingacting: {
    type:String,
    required:true
  },
  postid: {
    type:String,
    required:true
  },
});



export default mongoose.model("Popular Review",PopularReviewMongo)