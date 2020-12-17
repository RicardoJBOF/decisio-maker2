const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  //INSERT QUESTION ON DATABASE AFTER SENDING POLL (INDEX.HTML)
  const insertQuestion = (data) => {
    return new Promise(resolve => {
      db.query(`
        INSERT INTO polls (name)
        VALUES
        ('${data.question}')RETURNING *;`,
      (err, res) => {
        if (err) {
          console.log(err);
        }
        for (let i = 0; i < data.answers.length; i++) {
          db.query(`
              INSERT INTO options (name, poll_id)
              VALUES
              ('${data.answers[i]}', '${res.rows[0].id}') RETURNING *;`,
          (err, res2) => {
            if (err) {
              console.log(err);
            }
            resolve(res.rows[0].id);
          });
        }
      });
    });
  };

  router.post('/', (req, res) => {
    const data = req.body;
    insertQuestion(data)
      .then((id) => {
        sendLinks(`Admin link: http://localhost:8080/urls/result/${id} Share link http://localhost:8080/urls/${id}`);
        res.send({resp:id});
      });
  });




  return router;
};
