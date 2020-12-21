const express = require("express");
const router = express.Router();

module.exports = (db) => {

  const accessQuestion = (user) => {
    const id = parseInt(user.id);
    const data = { id };

    const query = {
      text: `SELECT polls.id, polls.name AS question, options.name AS options, options.id AS optionsid
      FROM polls
      INNER JOIN options ON polls.id = options.poll_id
      WHERE polls.id = ${id};`,
    };
    return db
      .query(query)
      .then((res) => {
        data.question = res.rows[0].question;
        data.answers = [];
        data.answersID = [];
        for (let i = 0; i < res.rows.length; i++) {
          data.answers.push(res.rows[i].options);
          data.answersID.push(res.rows[i].optionsid)
        }
        return data;
      })
      .catch((err) => err);
  };

  router.get("/:id", (req, res) => {
    const user = req.params;
    accessQuestion(user).then((data) => {
      res.render("survey", data);
    });
  });

  router.post("/:id", (req, res) => {

    const data = Object.values(req.body);
    const info = [];

    for(let i = 0; i < data[data.length - 1].length; i++) {
      info.push(`(${data[data.length - 1][i]}, ${data[i]}, null)`)
    }

    db.query(`
      INSERT INTO option_voters (weight, option_id, voter_id)
      VALUES
        ${info.join(',')}`
    )
      .then(resp => {
        res.render("voted");
      })
      .catch(err => {
        console.log(err);
      });


  });

  return router;
};
