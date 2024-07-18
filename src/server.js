import http from "http";
import { app } from "./app.js";
import dotenv from "dotenv";
import { mongoConnect } from "./services/connectToMongo.js";
import { LoadTop10MovieData } from "./models/Top10.model.js";
import { LoadRecentReleaseData } from "./models/RecentRelease.model.js";
import { loadPopularReviewdata } from "./models/PopularReview.model.js";
import { populateMovies } from "./models/Allmovies.model.js";


dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);



async function startServer() {
  await mongoConnect();
  await LoadTop10MovieData();
  await LoadRecentReleaseData();
  await loadPopularReviewdata();
  // await populateMovies();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
