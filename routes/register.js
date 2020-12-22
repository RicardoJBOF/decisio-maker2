const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  const getUserByEmail = function(email) {
    const query = {
      text: `SELECT *
      FROM creators
      WHERE email = ($1);`,
      values: [email]
    }
    return db.query(query)
    .then(res => res.rows[0])
    .then( err => err)
  };

  router.post('/', (req, res) => {
    const user = req.body;

    console.log(user)

    // getUserWithEmail(user.email)
    //   .then(userRes => {
    //     if (userRes !== undefined) {
    //       return res.status(400).send("User already registered, try login");
    //     } else if (!user.email || !user.password) {
    //       return res.status(400).send("Email or Password missing");
    //     } else {
    //       user.password = bcrypt.hashSync(user.password, 12);
    //       registerUser(user)
    //         .then(user => {
    //           req.session.userId = user;
    //           res.redirect('/');
    //         })
    //         .catch(e => res.send(e));
    //     }
    //   });
  });


  return router;
};
