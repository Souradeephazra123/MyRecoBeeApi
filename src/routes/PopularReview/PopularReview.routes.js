import express from 'express'
import { httpGetPopularReviewData } from './popularreview.controller.js';

const PopularReviewRoute=express.Router();


PopularReviewRoute.get("/",httpGetPopularReviewData);

export {PopularReviewRoute}