const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      const templateVars = {
        user: req.session.user_id,
      };
      res.render("index", templateVars);
    } else {
      res.render("login");
    }
  });

  //INSERT QUESTION ON DATABASE AFTER SENDING POLL (INDEX.HTML)
  const insertQuestion = (data) => {
    const query = {
      text: `INSERT INTO polls (name, creator_id)
        VALUES
        ($1, $2) RETURNING *;`,
      values: [data.question, data.user],
    };
    return db
      .query(query)
      .then((res) => res.rows[0].id)
      .catch((err) => err);
  };

  const insertOptions = (data, id) => {
    for (let i = 0; i < data.options.length; i++) {
      query = {
        text: `INSERT INTO options (name, poll_id)
        VALUES
        ($1, $2) RETURNING *;`,
        values: [data.options[i], id],
      };
      if (i !== data.options.length - 1) {
        db.query(query);
      } else {
        return db
          .query(query)
          .then((res) => res.rows[0].poll_id)
          .catch((err) => err);
      }
    }
  };

  // SEND EMAIL TO USER
  const sendLinks = function (info) {
    const domain  = process.env.MG_DOMAIN;
    const mg =  ({ apiKey: process.env.MG_KEY, domain: domain });
    const data = {
      from: "Decider2 <email@emailcom>",
      to: "ricardo.jbof@hotmail.com",
      subject: "Decider 2",
      text: info,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      }
      console.log(body);
    });
  };

  router.post("/", (req, res) => {
    const data = req.body;
    data.user = req.session.user_id;
    console.log("req.session---->", req.session)

    insertQuestion(data)
      .then((id) => insertOptions(data, id))
      .then((id) => {
        sendLinks(`
        Admin link: http://localhost:8080/result/${id}
        Share link http://localhost:8080/survey/${id}`);
        res.send({ response: id });
      })
      .catch((err) => err);
  });

  return router;
};
