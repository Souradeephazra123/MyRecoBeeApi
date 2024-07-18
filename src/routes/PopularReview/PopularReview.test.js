import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/connectToMongo.js";
import { loadPopularReviewdata } from "../../models/PopularReview.model.js";
import { app } from "../../app";

describe("Recent release API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPopularReviewdata();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /review/popular", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/common/review/popular")
        .expect("Content-Type", /json/)
        .expect(200);
    },10000);
  });
});


