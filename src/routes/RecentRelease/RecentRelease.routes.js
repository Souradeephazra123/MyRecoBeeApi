import express from 'express'
import { httpRecentRelease } from './RecentRelease.controller.js';


const RecentReleaseRouter=express.Router();


RecentReleaseRouter.get("/",httpRecentRelease)

export {RecentReleaseRouter}