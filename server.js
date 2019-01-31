var express = require("express");
var path = require("path");
var connection = require("./db/connection");


var app = express();
var PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res) {
  console.log(__dirname);
  console.log(path.join(__dirname, "search.html"));

  res.sendFile(path.join(__dirname, "search.html"));
});


app.get("/api/tables", function(req, res) {
  connection.query("SELECT * FROM tables", function(err, dbtables) {
    res.json(dbtables);
  });
});


app.get("/api/tables/:table", function(req, res) {
  console.log("req.params.reservation:", req.params.reservation);

  connection.query("SELECT * FROM tables WHERE name = ? LIMIT 1", [req.params.table], function(err, dbCharacter) {
    if (err) throw err;

    if (dbCharacter[0]) {
      res.json(dbtable[0]);
    } else {
      res.json(null);
    }
  });
});


app.post("/api/reservation", function(req, res) {
  console.log("req.body:", req.body);

  connection.query("INSERT INTO tables SET ?", req.body, function(err, result) {
    if (err) throw err;

    res.json(result);
  });
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
