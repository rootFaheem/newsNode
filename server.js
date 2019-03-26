// import express and Body-Parser
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// import cheerio and Request-promise
const rp = require("request-promise");
const $ = require("cheerio");

// URI to target
const url = "http://time.com/";

// BodyParser to work with body of the response
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//  root route to welcome the user
app.get("/", (req, res) => res.send("Welcome to NewsFetch! "));

// Route to get API
app.get("/getTimeNews", (req, res) => {
  // RP call to Time.com page
  rp(url)
    .then(function(html) {
      console.log($(".headline", html).length);

      // targetting the hedline class which has "a tag" as child
      let links = $(".headline > a", html);
      let news = [];

      // function to get all the data where the links condition matched
      $(links).each(function(i, link) {
        // storing the title and url
        let title = $(link).text();
        let url = $(link).attr("href");

        // storing the both elements into array
        news.push(title);
        news.push("http://time.com" + url);
      });
      // Code to extract only 6 news
      let sidebarNews = [];
      for (i = 6; i < 18; i += 2) {
        sidebarNews[i] = {
          news: {
            title: news[i],
            url: news[i + 1]
          }
        };
      }

      // response tobe shown on http://localhost:5000/getTimeNews
      res.json(sidebarNews);
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.listen(port, () => console.log(`server is running on: ${port}`));
