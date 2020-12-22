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

  router.post('/', (req, res) => {
    const data = req.body;
    getUserByEmail(data.email).then( user => {
      res.send(user)
    })
  });

  return router;
};
