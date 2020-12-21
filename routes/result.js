const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const user = req.params;
    console.log(user);

    res.render("result");

  });

  return router;
};
