const get_db = require("../../db");

// export getTopics function that retrieves topics,terms,years data from postgres DB

module.exports = {
  checkEmail: async (email) => {
    const db = await get_db();
    const result = await db.query(
      `SELECT id
      FROM users
      WHERE email = '${email}'
    `
    );

    return result.rows;
  },
  postNewUser: async (name, email, hashedPassword) => {
    const db = await get_db();
    const result = await db.query(
      `INSERT INTO users (name,email,passwordKey) values 
      ('${name}', '${email}', '${hashedPassword}')
    `
    );

    return result.rows;
  },
};
