const get_db = require("../../db");

// export getTopics function that retrieves topics,terms,years data from postgres DB

module.exports = {
  getTopics: async () => {
    const db = await get_db();
    const result = await db.query(
      `SELECT *
      FROM terms
      LEFT JOIN topics ON terms.id = topics.termid
      ORDER BY terms.id
    `
    );

    return result.rows;
  },
};
