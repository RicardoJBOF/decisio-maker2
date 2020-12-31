const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {

  router.get("/", (req, res) => {
    const templateVars = {
      user: req.session.user_id
    };
    res.render("login", templateVars);
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
        res.send({ noRegister: "noRegister" });
      } else {
        if (!bcrypt.compareSync(data.password, user.password)) {
          res.send({ wrongPassword: "wrongPassword" });
        } else {
          req.session.user_id = user.id;
          res.json({ user });
        }
      }
    });
  });

  return router;
};
