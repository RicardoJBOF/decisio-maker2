const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  router.get("/survey", (req, res) => {
    res.render("survey");
  });

  return router;
};
