express = require("express")
routes = require("./routes")
routesUsers = require("./routes/users")
routesBlogs = require("./routes/blogs")
mongoconfig = require("./utils/mongoconfig")
http = require("http")
app = express()

app.configure ->
  app.set "port", process.env.PORT or 4001
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("bloggaa.fi is awesome")
  app.use express.session()
  app.use app.router

app.configure "development", ->
  app.use express.errorHandler()

mongoconfig.config()

app.get "/", routes.index
app.get "/register", routesUsers.register
app.post "/register", routesUsers.createAccount
app.get "/settings", routes.settings
app.post "/settings", routes.saveSettings
app.get "/blog", routesBlogs.blogs
app.get "/blog/:blog", routesBlogs.showblog
app.get "/blog/:blog/title/:title", routesBlogs.showpost

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")