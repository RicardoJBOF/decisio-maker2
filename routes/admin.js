const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const accessQuestionPerUser = (user) => {
    const id = parseInt(user.id);
    const data = { id };

    const query = {
      text: `SELECT polls.id AS pollsid, polls.name AS question, creators.name AS creators, creators.id AS creatorsid
      FROM polls
      INNER JOIN creators ON creators.id = polls.creator_id
      WHERE creators.id = ${id};`,
    };
    return db
      .query(query)
      .then((res) => {
        data.creators = res.rows[0].creators;
        data.creatorsid = res.rows[0].creatorsid;
        data.pollsid = [];
        data.question = [];
        for (let i = 0; i < res.rows.length; i++) {
          data.pollsid.push(res.rows[i].pollsid);
          data.question.push(res.rows[i].question);
        }
        console.log(data);
        return data;
      })
      .catch((err) => err);
  };

  router.get("/:id", (req, res) => {
    const id = req.params;
    accessQuestionPerUser(id).then((data) => {
      const templateVars = {
        data,
        user: req.session.user_id
      };
      console.log(templateVars);
      res.render("admin", templateVars);
    });
  });

  return router;
};
