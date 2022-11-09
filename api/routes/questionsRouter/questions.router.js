const express = require("express");
const router = express.Router();
const Joi = require("joi");
const questionsRepository = require("./questions.repository");
const get_db = require("../../db");

const pathParamValidationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);

  if (error) {
    const { details } = error;
    const message = details.map((detail) => detail.message);

    res.status(400).json({ message: message });
  } else {
    next();
  }
};

const pathParamsSchema = Joi.object().keys({
  topicId: Joi.number().integer().min(1),
});

router.get(
  "/:topicId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (req, res, next) => {
    try {
      const { topicId } = req.params;

      const db = await get_db();
      const checkTopicId = await db.query(
        `SELECT id FROM topics WHERE id = $1`,
        [topicId]
      );

      if (checkTopicId.rows.length === 0) {
        return res.status(404).json({ error: "ID not found" });
      }

      const response = await questionsRepository.getQuestions(topicId);
      return res.json(response).status(200);
    } catch (err) {
      next(err);
    }
  }
);

// router.get("/:topicId", async (req, res, next) => {
//   try {
//     const { topicId } = req.params;
//     if (!parseInt(topicId)) {
//       const error = new Error(`topic id is not an integer`);
//       error.status = 400;
//       throw error;
//     }
//     const db = await get_db();
//     const checkTopicId = await db.query(`SELECT id FROM topics WHERE id = $1`, [
//       topicId,
//     ]);

//     if (checkTopicId.rows.length === 0) {
//       return res.status(404).json({ error: "ID not found" });
//     }

//     const response = await questionsRepository.getQuestions(topicId);
//     return res.json(response).status(200);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
