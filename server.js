let express = require("express");
let app = express();
let hbs = require("hbs");
let fs = require("fs");

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
  res.render("home.hbs", {
    pageTitle: "About page",
    welcome: "Hello This is the HomePage",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page",
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMsg: "Unable to handle request",
  });
});

app.listen(3000, () => {
  console.log(`app is listening on port : 3000`);
});
