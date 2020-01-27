// Imports
const express = require('express');
const app = express();
const bodyParser  = require("body-parser");
const cookieParser = require('cookie-parser');

// Routes
const indexRoutes = require("./routes/index")
const eventsRoutes = require("./routes/events")
app.use(cookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/events", eventsRoutes);


app.listen(8080, '0.0.0.0' , function () {
  console.log('Example app listening on port 8080!');
});