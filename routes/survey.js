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

  // router.post("/:id", (req, res) => {
  //   console.log(Object.keys(req.body));


  //   const rows = [];

  //   Object.keys(req.body).forEach(key=> {
  //     if (key.includes('select_name')) {
  //       const num = key.split('select_name')[1];
  //       console.log('num---->', num)
  //       const weight = req.body[key];
  //       console.log('weight---->', weight)
  //       rows.push(`(${weight}, ${num}, ${null})`);
  //       console.log(rows)
  //       console.log(rows.join(','))
  //     }
  //   });

  //   db.query(`
  //     INSERT INTO option_voters (weight, option_id, voter_id)
  //     VALUES
  //       ${rows.join(',')}`
  //   )
  //     .then(resp => {
  //       res.json("VOTED!");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });





  return router;
};
