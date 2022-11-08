const get_db = require("../../db");

module.exports = {
  postQuestion: async (description, topicId) => {
    const db = await get_db();
    const result = await db.query(
      `INSERT INTO answers (description, topicId)
        VALUES($1, $2)`,
      [description, topicId]
    );

    return result.rows;
  },
};
