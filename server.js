let express = require("express");
let app = express();
let hbs = require("hbs");
let fs = require("fs");
let port = process.env.PORT || 4000;

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentyear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (test) => {
  return test.toUpperCase();
});

app.use((req, res, next) => {
  let time = new Date().toString();
  fs.appendFile("server.log", time + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(`${time}:${req.method} , ${req.url}`);

  next();
});

// app.use((req, res, next) => {
//   res.render("maintenace.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World</h1>");
  res.render("Home.hbs", {
    pageTitle: "About page",
    welcome: "Hello This is the HomePage",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    Title: "projects",
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMsg: "Unable to handle request",
  });
});

app.listen(port, () => {
  console.log(`app is listening on port : ${port}`);
});
