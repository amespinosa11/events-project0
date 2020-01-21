// Imports
const express = require('express');
const app = express();
const bodyParser  = require("body-parser");

// Routes
const indexRoutes = require("./routes/index")
const eventsRoutes = require("./routes/events")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/events", eventsRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});