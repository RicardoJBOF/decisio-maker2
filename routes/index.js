const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  //INSERT QUESTION ON DATABASE AFTER SENDING POLL (INDEX.HTML)
  const insertQuestion = (data) => {
      const query = {
        text: `INSERT INTO polls (name)
        VALUES
        ($1) RETURNING *;`,
        values: [data.question]
      }
      return db.query(query)
      .then(res => res.rows[0].id)
      .catch(err => err)
  };

  const insertOptions = (data, id) => {
    for (let i = 0; i < data.options.length; i++) {
      query = {
        text:`INSERT INTO options (name, poll_id)
        VALUES
        ($1, $2) RETURNING *;`,
        values: [data.options[i], id]
      }
      if (i !== data.options.length - 1) {
        db.query(query)
      } else {
      return db.query(query)
      .then(res => res.rows[0].poll_id)
      .catch(err => err)
      }
    }
  };

  router.post("/", (req, res) => {
    const data = req.body;
    insertQuestion(data)
    .then(id => insertOptions(data, id))
    .then(id => {
      res.send({ response: id });
    })
    .catch(err => err);
  });
  return router;
};
