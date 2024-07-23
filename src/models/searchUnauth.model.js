import AllMoviesDatabase from "./Allmovies.mongo.js";
// import redis from "redis";

//create redis clent to connect redix server
// let redisClient;
// (async () => {
//   redisClient = redis.createClient();
//   redisClient.on("error", (err) => console.log("Redis Client Error", err));

//   await redisClient.connect();
// })();

async function findMovie(query) {
  console.log(query);
  // Ensure query is a string
  if (typeof query !== "string") {
    console.error("Query must be a string");
    return;
  }

  //check if cached query data present in redis
  // const cachedData = await redisClient.get(`searchMovie:${query}`);
  // if (cachedData) {
  //   console.log("Returning cached data from Redis");
  //   return JSON.parse(cachedData);
  // }

  let data = await AllMoviesDatabase.find({
    $or: [
      //this $options: "$i" part helps to search case sensitive
      { title: { $regex: query } },
      //   { genre: { $regex: query, $options: "$i" } },
      //   { director: { $regex: query, $options: "$i" } },
      //   { actors: { $regex: query, $options: "$i" } },
      //   { plot: { $regex: query, $options: "$i" } },
      //   { year: { $regex: query, $options: "$i" } },
      //   { rated: { $regex: query, $options: "$i" } },
      //   { runtime: { $regex: query, $options: "$i" } },
      //   { language: { $regex: query, $options: "$i" } },
    ],
  });

  // Store the result in Redis
  // await redisClient.set(`searchMovie:${query}`, JSON.stringify(data));

  return data;
}

export { findMovie };
