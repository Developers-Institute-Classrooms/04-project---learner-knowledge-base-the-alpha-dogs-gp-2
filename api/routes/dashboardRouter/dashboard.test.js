const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const { getNewQuestions, getNewAnswers } = require("./dashboard.repository");

describe("FAQ Dashboard API", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });
  test("GET /dashboard should return questions waiting for review, with status code of 200", async () => {
    const expectedData = await getNewQuestions();
    const response = await request(app).get("/dashboard");
    expect(response.body.questions).toEqual(expectedData);
    expect(response.status).toBe(200);
  });
  test("GET /dashboard should return answers waiting for review, with status code of 200", async () => {
    const expectedData = await getNewAnswers();
    const response = await request(app).get("/dashboard");
    expect(response.body.answers).toEqual(expectedData);
    expect(response.status).toBe(200);
  });
});
