// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const resultRouter  = require("./routes/result");

//MANDANDO A ROUTE PARA O DIRETORIA A PARTE
const surveyRouter  = require("./routes/survey");


app.use("/", indexRouter(db));
app.use("/login", loginRouter(db));
app.use("/register", registerRouter(db));
app.use("/admin/:id", adminRouter(db));
app.use("/result/:id", resultRouter(db));

//MANDANDO A ROUTE PARA O DIRETORIA A PARTE
app.use("survey", surveyRouter(db));


//SE DESCOMENTAR, A PAGINA VAI RENDERIZAR
// app.get("/survey", (req, res) => {
//   res.render("survey");
// });

app.listen(PORT, () => {
  console.log(`decision-maker2 listening on port ${PORT}`);
});
