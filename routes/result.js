const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const accessData = (user) => {
    const id = parseInt(user.id);
    const data = { id };

    const query = {
      text: `
      SELECT polls.name AS question, options.name as option, weight, options.id as questionID
      FROM
      polls JOIN options ON polls.id = poll_id
      JOIN option_voters ON options.id = option_id
      WHERE polls.id = ${id}`
    };

    return db
      .query(query)
      .then((res) => {
        data.question = res.rows[0].question;
        data.answers = [];
        data.answersID = [];
        for (let i = 0; i < res.rows.length; i++) {
          data.answers.push(res.rows[i].options);
          data.answersID.push(res.rows[i].optionsid);
        }
        return data;
      })
      .catch((err) => err);
  };



  router.get("/:id", (req, res) => {
    const user = req.params;
    console.log(user);
    res.render("result");

  });

  return router;
};
