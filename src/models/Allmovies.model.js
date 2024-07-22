// import AllMoviesDatabase from "./Allmovies.mongo.js";
// import data from "../data/ids.json" assert { type: "json" };
// import axios from "axios";
// import fs from "fs";

// // async function populateMovies() {
// //   console.log(data.length);
// //   let MovieIdChunk = 1000;
// //   for (let i = 0; i < data.length; i += MovieIdChunk) {
// //     let chunk = data.slice(i, i + MovieIdChunk);

// //     chunk.forEach(async (id) => {
// //       const movie = await MovieData(id);

// //       if (movie.status !== 200) {
// //         console.log("Unable to doenload data");
// //         throw new Error(
// //           `Failed to upload the movie with id ${movie.data.movieid}`
// //         );
// //       }

// //       await saveMovie(movie.data);
// //     });
// //   }

// //   console.log("Populated all movie data");
// // }

// async function populateMovies() {
//   console.log(`Starting to populate ${data.length} movies.`);
//   const MovieIdChunk = 1000; // Adjust based on rate limits and performance
//   for (let i = 0; i < 36000; i += MovieIdChunk) {
//     const chunk = data.slice(i, i + MovieIdChunk);
//     // const moviePromises = chunk.map( (id) => {
//     //   MovieData(id).catch((error) => ({ error, id }));
//     // });
//     const moviePromises = chunk.map(async (id) => {
//       try {
//         return await MovieData(id); // Assuming MovieData is an async function
//       } catch (error) {
//         return { error, id };
//       }
//     });
//     const results = await Promise.allSettled(moviePromises);

//     for (const result of results) {
//       if (result.status === "fulfilled" && result.value.status === 200) {
//         await saveMovie(result.value.data).catch((error) =>
//           console.error(`Failed to save movie: ${error.message}`)
//         );
//       } else if (result.status === "rejected" || result.value.error) {
//         console.error(
//           `Failed to download movie data for ID ${result.value.id}: ${
//             result.reason || result.value.error.message
//           }`
//         );
//       }
//     }
//     console.log(`Processed ${i + chunk.length} of ${data.length} movies.`);
//   }

//   console.log("Finished populating movie data.");
// }

// async function MovieData(id) {
//   const response = axios.get(`${process.env.prod_api}/${id}`);
//   return response;
// }

// async function findMovie(filter) {
//   await AllMoviesDatabase.findOne(filter);
// }

// async function saveMovie(movie) {
//   await AllMoviesDatabase.findOneAndUpdate(
//     {
//       movieid: movie.movieid,
//     },
//     movie,
//     { upsert: true }
//   );
// }

// export { populateMovies };



import AllMoviesDatabase from "./Allmovies.mongo.js";
import data from "../data/ids.json" assert { type: "json" };
import axios from "axios";
import fs from "fs";

// async function populateMovies() {
//   console.log(data.length);
//   let MovieIdChunk = 1000;
//   for (let i = 0; i < data.length; i += MovieIdChunk) {
//     let chunk = data.slice(i, i + MovieIdChunk);

//     chunk.forEach(async (id) => {
//       const movie = await MovieData(id);

//       if (movie.status !== 200) {
//         console.log("Unable to doenload data");
//         throw new Error(
//           `Failed to upload the movie with id ${movie.data.movieid}`
//         );
//       }

//       await saveMovie(movie.data);
//     });
//   }

//   console.log("Populated all movie data");
// }

async function populateMovies() {
  console.log(`Starting to populate ${data.length} movies.`);
  const MovieIdChunk = 1000; // Adjust based on rate limits and performance
  for (let i = 0; i < data.length; i += MovieIdChunk) {
    const chunk = data.slice(i, i + MovieIdChunk);
    // const moviePromises = chunk.map( (id) => {
    //   MovieData(id).catch((error) => ({ error, id }));
    // });
    const moviePromises = chunk.map(async (id) => {
      try {
        const ExisingId=await findMovieId(id);
        if(ExisingId) return;
        const response= await MovieData(id); // Assuming MovieData is an async function
      return response;
      } catch (error) {
        return { error, id };
      }
    });
    const results = await Promise.allSettled(moviePromises);

    for (const result of results) {
      if (result?.status === "fulfilled" && result?.value?.status === 200) {
        await saveMovie(result?.value?.data).catch((error) =>
          console.error(`Failed to save movie: ${error.message}`)
        );
      } else if (result?.status === "rejected" || result?.value?.error) {
        console.error(
          `Failed to download movie data for ID ${result.value.id}: ${
            result?.reason || result?.value?.error?.message
          }`
        );
      }
    }
    console.log(`Processed ${i + chunk.length} of ${data.length} movies.`);
  }

  console.log("Finished populating movie data.");
}

async function MovieData(id) {
  try {
    const response = await axios.get(`${process.env.prod_api}/${id}`);
    return response; // Return axios response object
  } catch (error) {
    throw new Error(`Failed to fetch movie data for ID ${id}: ${error.message}`);
  }
}

async function findMovieId(id) {
  try {
    const objectId = String(id); 
    //finding by id as object as findById expects an object
    const movie = await AllMoviesDatabase.findOne({ movieid: id }); 
    return movie; // Return found movie object or null if not found 
  } catch (error) {
    console.error(`Error finding movie by id ${id}:`, error);
    throw error; // Rethrow error to be handled by caller
  }
}

async function saveMovie(movie) {
  await AllMoviesDatabase.findOneAndUpdate(
    {
      movieid: movie.movieid,
    },
    movie,
    { upsert: true }
  );
}

export { populateMovies };