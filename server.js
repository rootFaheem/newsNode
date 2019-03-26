const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const rp = require("request-promise");
const $ = require("cheerio");

const url = "http://time.com/";

// BodyParser to work with body of the response
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//  root route to welcome the user
app.get("/", (req, res) => res.send("Welcome to NewsFetch! "));

// Route to get API
app.get("/getTimeNews", (req, res) => {
  let data = [];
  let news = { title: "", url: "" };

  // RP call to wikipedia page
  rp(url)
    .then(function(html) {
      console.log($(".headline", html).length);

      let links = $(".headline > a", html);
      $(links)
        .each(function(i, link) {
          let title = $(link).text();
          let news = $(link).attr("href");

          news.title = title;
          news.url = url;
          console.log($(link).text() + ":\n  " + $(link).attr("href"));
        })
        .then(() => {
          res.send(data);
        });
    })
    .catch(function(err) {
      //handle error
    });
});

app.listen(port, () => console.log(`server is running on: ${port}`));
