const express = require("express");

const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// BodyParser to work with body of the response
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//  root route to welcome the user
app.get("/", (req, res) => res.send("Welcome to NewsFetch! "));

// Route to get API
app.get("/getTimeNews", (req, res) => {});

app.listen(port, () => console.log(`server is running on: ${port}`));
