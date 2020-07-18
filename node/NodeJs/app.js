require('./model/db');
const path = require("path");
const express = require('express');
const i18n = require("i18n-express"); // Localization
var app = express();
//const routes = require('./router');
var bodyparser = require('body-parser');
const config = require('config');

if(!config.get('jwtPrivateKey')){
  console.log('JWT Token Not Set');
  process.exit(1);
}
app.use( bodyparser.json() );  
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, OPTIONS, DELETE, GET"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

app.set("view engine", "ejs");
// app.set("views", "views");
app.set("views", path.join(__dirname, "views"));

app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["en", "es", "fr", "de"],
    textsVarName: "translation"
  })
);

  app.set('port',3000);
  PORT = app.get('port');
  
  const apiRoutes = require("./router/index");
  const frontendRoutes = require("./router/frontend");
  app.use("/api", apiRoutes);
  app.use(frontendRoutes);
  
  //app.use("/api", routes);
  //app.use("/", routes);
  //const frontendRoutes = require("./router/frontend");
  //app.use(frontendRoutes);

  app.use(express.static(__dirname + '/public/uploads'));
  app.use(express.static(path.join(__dirname, "public")));
  var server = app.listen(PORT, function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
  });


