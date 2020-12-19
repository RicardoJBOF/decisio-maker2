const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  const accessQuestion = function(user) {
    return new Promise(resolve => {
      let pollId = parseInt(user.pollId);
      let result = {};
      result.poll = pollId;
      db.query(`
    SELECT id, name
    FROM polls
    WHERE id = ${pollId};
    `, (err, res) => {
        if (err) {
          console.log(err);
        }
        result.pollname = res.rows;
        db.query(`
      SELECT id, name
      FROM options
      WHERE poll_id = ${pollId};
      `, (err, res) => {
          if (err) {
            console.log(err);
          }
          result.options = res.rows;
          resolve(result);
        });
      });
    });
  };

  router.get("/:id", (req, res) => {
    const user = req.params;

    res.render("survey");
  });

  return router;
};
