const express = require("express");
const dashboardRouter = express();
const { getNewQuestions, getNewAnswers } = require("./dashboard.repository");

/**  router localhost:5000/dashboard - to fetch questions from questions table
 * and fetch answers from answers table,
 * it returns newPosts as [[questions],[answers]]
 * */
dashboardRouter.get("/", async (req, res) => {
  try {
    const newQuestions = await getNewQuestions();
    const newAnswers = await getNewAnswers();
    const newPosts = { questions: newQuestions, answers: newAnswers };
    res.json(newPosts);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = dashboardRouter;
