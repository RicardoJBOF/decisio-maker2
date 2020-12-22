const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT *
      FROM creators
      WHERE email = ($1);`,
      values: [email]
    }
    return db.query(query)
    .then(res => res.rows[0])
    .then( err => err)
  };

  const registerUser = (user) => {
    const query = {
      text: `INSERT INTO creators (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`,
      values: [user.name, user.email, user.password]
    }
    return db.query(query)
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  };

  router.post('/', (req, res) => {
    const data = req.body;
    getUserByEmail(data.email).then( user => {
      !user ? registerUser(data).then(user => res.send(user)) : res.send();
    })
  });

  return router;
};
