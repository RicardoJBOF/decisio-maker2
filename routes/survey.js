const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const accessQuestion = (user) => {
    const id = parseInt(user.id);
    const data = { id };

    const query = {
      text: `SELECT polls.id, polls.name AS question, options.name AS options
      FROM polls
      INNER JOIN options ON polls.id = options.poll_id
      WHERE polls.id = ${id};`,
    };
    return db
      .query(query)
      .then((res) => {
        data.question = res.rows[0].question;
        data.answers = [];
        for (let i = 0; i < res.rows.length; i++) {
          data.answers.push(res.rows[i].options);
        }
        return data;
      })
      .catch((err) => err);
  };

  router.get("/:id", (req, res) => {
    const user = req.params;
    accessQuestion(user).then((data) => {


      console.log(data)
      res.render("survey", data);
    });
  });

  return router;
};
