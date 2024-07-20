import AllMoviesDatabase from "./Allmovies.mongo.js";


async function findMovie(query) {
  console.log(query);
  // Ensure query is a string
  if (typeof query !== "string") {
    console.error("Query must be a string");
    return;
  }

 

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


  return data;
}

export { findMovie };
