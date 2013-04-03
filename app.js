(function() {
  var app, express, http, mongoconfig, routes, routesBlogs, routesUsers;

  express = require("express");

  routes = require("./routes");

  routesUsers = require("./routes/users");

  routesBlogs = require("./routes/blogs");

  mongoconfig = require("./utils/mongoconfig");

  http = require("http");

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 4001);
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("bloggaa.fi is awesome"));
    app.use(express.session());
    return app.use(app.router);
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  mongoconfig.config();

  app.get("/", routes.index);

  app.get("/register", routesUsers.register);

  app.post("/register", routesUsers.createAccount);

  app.get("/login", routesUsers.login);

  app.get("/login/:error", routesUsers.login);

  app.post("/login", routesUsers.handleLogin);

  app.get("/settings", routes.settings);

  app.post("/settings", routes.saveSettings);

  app.get("/write", routesBlogs.write);

  app.get("/edit/:id", routesBlogs.edit);

  app.post("/saveBlog", routesBlogs.saveBlog);

  app.post("/saveEdit/:id", routesBlogs.saveEdit);

  app.get("/blog", routesBlogs.blogs);

  app.get("/blog/:blog", routesBlogs.showblog);

  app.get("/blog/:blog/title/:title", routesBlogs.showpost);

  app.get("/latest", routesBlogs.latestBlogs);

  app.get("/latest/blogs", routesBlogs.latestBlogs);

  app.get("/latest/texts", routesBlogs.latestTexts);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
