const express = require("express");
const { request } = require("../dashboardRouter/dashboard.router");
const router = express.Router();
const repository = require("./users.repository");
const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (request, response, next) => {
  try {
    const { email, password } = request.query;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Please enter a valid email and password." });
    }
    const existingEmail = await repository.checkEmail(email);
    if (existingEmail.length === 0) {
      const error = new Error("Email doesnt exist");
      error.status = 404;
      throw error;
    }
    const result = await repository.getUser(email);
    const { passwordkey, name, id, scope } = result;
    const authenticationStatus = await bcrypt.compare(password, passwordkey);
    if (!authenticationStatus) {
      const error = new Error("Invalid Password");
      error.status = 400;
      throw error;
    }
    const token = jwt.sign({ id: id }, config.secret, {
      expiresIn: 1200,
    });
    return response.json({
      token,
      user: {
        name,
        id,
        scope,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await repository.checkEmail(email);
    if (existingEmail.length > 0) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error;
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    await repository.postNewUser(name, email, hashedPassword);
    res.status(200).send({ message: "WOOOOHOOOOOOO" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
