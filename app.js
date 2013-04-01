(function() {
  var app, blogPostSchema, blogSchema, express, http, mongoose, routes, userSchema;

  express = require("express");

  routes = require("./routes");

  http = require("http");

  mongoose = require('mongoose');

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

  blogSchema = mongoose.Schema({
    name: 'String',
    url: 'String',
    added: 'Date',
    lastpost: 'Date'
  });

  blogPostSchema = mongoose.Schema({
    title: 'String',
    content: 'String',
    added: 'Date',
    hidden: 'Boolean',
    visits: 'Number',
    user: 'ObjectId',
    blog: 'ObjectId'
  });

  userSchema = mongoose.Schema({
    email: 'String',
    password: 'String',
    salt: 'String',
    added: 'Date',
    lastvisit: 'Date',
    lastpost: 'Date'
  });

  mongoose.model('blogs', blogSchema);

  mongoose.model('blogposts', blogPostSchema);

  mongoose.model('users', userSchema);

  mongoose.connect('localhost', 'bloggaa');

  app.get("/", routes.index);

  app.get("/register", routes.register);

  app.post("/register", routes.createAccount);

  app.get("/blog", routes.blogs);

  app.get("/blog/:blog", routes.showblog);

  app.get("/blog/:blog/title/:title", routes.showpost);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
