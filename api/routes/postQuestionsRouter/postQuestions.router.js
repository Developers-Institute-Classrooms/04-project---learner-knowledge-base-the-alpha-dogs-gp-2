const express = require("express");
const router = express.Router();
const Joi = require("joi");
const repository = require("./postQuestions.repository");
const get_db = require("../../db");

// path parameters validation middleware
const pathParamValidationMiddleware = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.params);
  if (error) {
    const { details } = error;
    const message = details.map((detail) => detail.message);
    return response.status(400).json({ message: message });
  } else {
    next();
  }
};
// path parameter schema
const pathParamsSchema = Joi.object().keys({
  description: Joi.string(),
  topicId: Joi.number().integer().min(1).max(9999),
});

router.post(
  `/:topicId`,
  pathParamValidationMiddleware(pathParamsSchema),
  async (req, res, next) => {
    try {
      const { description } = req.body;
      const { topicId } = req.params;

      const checkId = await repository.checkTopicId(topicId);

      if (checkId.length === 0) {
        return res.status(404).json({ error: "ID not found" });
      }

      await repository.postQuestion(description, topicId);

      return res.status(201).send({ message: "Question has been Posted" });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

module.exports = router;
