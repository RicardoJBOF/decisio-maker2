const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    res.render("survey");
  });

  return router;
};
