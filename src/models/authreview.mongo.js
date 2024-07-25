import mongoose from "mongoose";

const AuthReviewMongo = new mongoose.Schema({
  movieid: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  postid: {
    type: String,
    required: true,
  },
  pk: {
    type: String,
    required: true,
  },
  sk: {
    type: String,
    required: true,
  },
  rpk: {
    type: String,
    required: true,
  },
  rsk: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  reviewtitle: {
    type: String,
    required: true,
  },
  isdraft: {
    type: String,
    required: true,
  },
  reviewcomment: {
    type: String,
    required: true,
  },
  reviewrating: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  hasspoilers: {
    type: String,
    required: true,
  },
  familyfriendly: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: String,
    required: true,
  },
  dislikes: {
    type: Number,
  },
  moviename: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  ratingstory: {
    type: String,
    required: true,
  },
  ratingvisuals: {
    type: String,
    required: true,
  },
  ratingmusic: {
    type: String,
    required: true,
  },
  ratingdirection: {
    type: String,
    required: true,
  },
  ratingacting: {
    type: String,
    required: true,
  },
  islike: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userimage: {
    type: String,
  },
  userrole: {
    type: String,
  },
  ispremium: {
    type: String,
    required: true,
  },
  usertag: {
    type: String,
    required: true,
  },
  posterimageurl: {
    type: String,
  },
  posterimage: {
    type: String,
  },
  backdropimageurl: {
    type: String,
  },
  backdropimage: {
    type: String,
  },
  imdbrating: {
    type: String,
  },
  language: {
    type: String,
  },
  parentalguidance: {
    type: String,
  },
  synopsis: {
    type: String,
  },
  genre:{
    type: String,
  
  },
  isseries:{
    type: String,
  
  },
  director:{
    type: String,
  
  },
  country:{
    type: String,
  
  },
  arrating:{
    type: String,
  
  },
  runningtime:{
    type: String,
  
  },
  movieimage:{
    type: String,
  
  },
  releasedate:{
    type: String,
  
  },
  moviecast:{
    type: String,
  
  },

});

export default mongoose.model("AuthReview", AuthReviewMongo);
