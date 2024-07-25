import AuthReviewDatabase from "./authreview.mongo.js";

async function getMovieReviewData(movieid) {
  return await AuthReviewDatabase.find(
    { movieid: movieid },
    { _id: 0, __v: 0 }
  );
}

async function postAuthReviewData(review) {
  const date = new Date();
  console.log("R#MOV-" + review.movieid + "#T-" + date.toISOString());
  const postid = "R#MOV-" + review.movieid + "#T-" + date.toISOString();
  const sk = "REVIEW#USER-" + review.userid + "#T" + date.toISOString();
  const rsk = "REVIEW#USER-" + review.userid + "#T" + date.toISOString();
  const rpk = "MOV-" + review.movieid;
  const pk = "MOV-" + review.movieid;
  const datetime = date.toISOString();

  const newReview = Object.assign(review, {
    postid,
    pk,
    sk,
    rpk,
    rsk,
    datetime,
  });
  await saveReview(newReview);
}

//async get specific review by postid ans sk
async function GetSpecificReview(postid, sk) {
  const review = await AuthReviewDatabase.findOne(
    { postid: postid, sk: sk },
    { _id: 0, __v: 0 }
  );
  return review;
}

// async function likeReview
async function likeReview(likedata) {
  const { username, moviename, postid, likestatus, postuserid, pk, sk } =
    likedata;

  //get the specific review
  const selectedReview = await GetSpecificReview(postid, sk);
  if (!selectedReview) {
    throw new Error("Review not found");
  }

  const prevValue = {
    likes: selectedReview.likes,
    dislikes: selectedReview.dislikes,
    isLike: selectedReview.islike,
  };

  //for like if liked then send true, if removing that like , send null
  //for like if disliked then send false, if removing that dislike , send null

  const updatedLike = {
    $set: { islike: likestatus },
  };

  if (likestatus === true) {
    updatedLike.$inc = { likes: 1 };
    // if (prevValue.dislikes !== 0) updatedLike.$inc.dislikes = -1;
  } else if (likestatus === false) {
    updatedLike.$inc = { dislikes: 1 };
    // if (prevValue.likes !== 0) updatedLike.$inc.likes = -1;
  } else {
    if (prevValue.isLike === true) updatedLike.$inc = { likes: -1 };
    else if (prevValue.isLike === false) updatedLike.$inc = { dislikes: -1 };
  }

  //perform the update
  const updatedReview = await AuthReviewDatabase.updateOne(
    { postid: postid, sk: sk },
    updatedLike
  );

  // Step 3: Return success message or the updated review
  // This depends on your application's needs. Here, we'll return a success message.
  if (updatedReview.modifiedCount === 0) {
    throw new Error("Failed to Like or dislike");
  }
  return {
    message: "Sucess updated likestatus",
  };
}

// async function EditReview(only the user who post it)
// async function DeleteReview(only the user who post it)
// async function FetchAllReviewof a user by usserid(only the user who post it)

async function saveReview(review) {
  await AuthReviewDatabase.findOneAndUpdate(
    {
      postid: review.postid,
    },
    review,
    { upsert: true }
  );
}

export { getMovieReviewData, postAuthReviewData, likeReview };
