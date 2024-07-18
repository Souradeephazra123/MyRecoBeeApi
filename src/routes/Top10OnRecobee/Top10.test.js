import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/connectToMongo.js";
import { LoadTop10MovieData } from "../../models/Top10.model.js";
import { app } from "../../app";

describe("Top10recobee API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await LoadTop10MovieData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /common/trending", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/common/trending")
        .expect("Content-Type", /json/)
        .expect(200);
    },10000);
  });
});


