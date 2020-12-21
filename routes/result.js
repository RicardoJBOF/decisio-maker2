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
        data.answers = {};

        for (let i = 0; i < res.rows.length; i++) {
          if(data.answers[res.rows[i].questionid]) {
            data.answers[res.rows[i].questionid].push(res.rows[i].weight);
          } else {
            data.answers[res.rows[i].questionid] = [res.rows[i].weight]
          }
        }

        const maxPoints = Object.entries(data.answers).length;
        const minPoints = 1;

        for(const score in data.answers){
          data.answers[score] = data.answers[score].map( x => maxPoints + minPoints - x).reduce( (a,b) => a + b, 0)
        }

        return data;
      })
      .catch((err) => err);
  };

  router.get("/:id", (req, res) => {
    const id = req.params;
    accessData(id).then( data => {
      res.render("result", data)
    });
  });

  return router;
};
