const express = require("express");
const router = express.Router();
const repository = require("./topics.repository");

router.use("/", async (req, res, next) => {
  try {
    const response = await repository.getTopics();
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
