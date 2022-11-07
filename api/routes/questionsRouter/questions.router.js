const express = require("express");
const router = express.Router();
const questionsRepository = require("./questions.repository");

router.get("/:topicId", async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const response = await questionsRepository.getQuestions(topicId);
    if (response.length === 0) {
      return res.status(404).json({ message: "ID not found" });
    }

    return res.json(response).status(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
