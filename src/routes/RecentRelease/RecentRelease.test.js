import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/connectToMongo.js";
import { LoadRecentReleaseData } from "../../models/RecentRelease.model.js";
import { app } from "../../app";

describe("Recent release API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await LoadRecentReleaseData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /all/ott", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/common/all/ott")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  },10000);
});


