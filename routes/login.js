const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT *
      FROM creators
      WHERE email = ($1);`,
      values: [email],
    };
    return db
      .query(query)
      .then((res) => res.rows[0])
      .then((err) => err);
  };

  router.post("/", (req, res) => {
    const data = req.body;

    getUserByEmail(data.email).then((user) => {
      if (!user) {
        res.send({ noRegister: 'noRegister' })
      } else {
        if (!bcrypt.compareSync(data.password, user.password)) {
          res.send({ wrongPassword: 'wrongPassword' })
        } else {
          const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
          res.json({ token, user })
        }
      }
    });
  });

  return router;
};
