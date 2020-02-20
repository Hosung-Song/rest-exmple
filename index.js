const express = require("express");
const app = express();
const bparser = require("body-parser");
const mysql = require("mysql2");

const port = 5000;

// body parser
app.use(bparser.urlencoded({ extended: true }));
app.use(bparser.json());

app.get("/", (req, res) => res.send("Hello World!!!!"));

app.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "Myschema"
  });

  connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results);
      console.log(fields);
    }
  );

  connection.query("SELECT * FROM User WHERE email = ?", [id], function(
    err,
    results
  ) {
    console.log(err);
    console.log(results);

    const user = results[0];
    if (pw === user.password) {
      console.log("비밀번호 일치");
    } else {
      console.log("비밀번호 불일치");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
