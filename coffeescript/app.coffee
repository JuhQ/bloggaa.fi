express = require("express")
routes = require("./routes")
routesUsers = require("./routes/users")
routesBlogs = require("./routes/blogs")
routesApi = require("./routes/api")
routesDashboard = require("./routes/dashboard")
http = require("http")
MongoStore = require('connect-mongo')(express)
mongoose = require('mongoose')
mongoconfig = require("./utils/mongoconfig")()
app = express()

app.configure ->
  app.set "port", process.env.PORT or 4001
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("bloggaa.fi is awesome")

  app.use express.session
    secret:'bloggaa.fi is awesome and fun'
    cookie: {maxAge: 60000 * 60 * 24 * 30 * 12, domain: ".bloggaa.fi"} # one year
    store: new MongoStore
      db: "bloggaa"

  #app.use express.session(
  #  cookie:
  #    domain: ".bloggaa.fi"
  #)
  app.use app.router

app.configure "development", ->
  app.use express.errorHandler()

app.get "/", routes.index
app.get "/register", routesUsers.register
app.post "/register", routesUsers.createAccount
app.get "/login", routesUsers.login
app.get "/login/:error", routesUsers.login
app.get "/logout", routesUsers.logout
app.post "/login", routesUsers.handleLogin

app.get "/tag/:tag", routesBlogs.tagSearch
app.get "/search/:tag", routesBlogs.search
app.post "/search", routesBlogs.postSearch

app.get "/like/:id", routesBlogs.like
app.get "/dashboard", routesDashboard.index
app.get "/dashboard/settings", routesDashboard.settings
app.get "/dashboard/visits", routesDashboard.visits
app.get "/dashboard/saved", routes.settings
app.post "/dashboard/settings", routes.saveSettings
app.post "/dashboard/settings/account", routes.saveAccountSettings
app.get "/dashboard/write", routesBlogs.write
app.get "/dashboard/reblog/:id", routesBlogs.reblog
app.get "/dashboard/edit/:id", routesBlogs.edit
app.get "/dashboard/show/:id", routesBlogs.show
app.get "/dashboard/hide/:id", routesBlogs.hide
app.get "/dashboard/delete/:id", routesBlogs.remove
app.post "/dashboard/saveBlog", routesBlogs.saveBlog
app.post "/dashboard/saveEdit/:id", routesBlogs.saveEdit

app.post "/dashboard/upload", routesBlogs.uploadImage


app.get "/blog", routesBlogs.latestBlogs
app.get "/blog/:blog", routesBlogs.showblog
app.get "/blog/:blog/page/:page", routesBlogs.showblog
app.get "/blog/:blog/title/:title", routesBlogs.showpost

app.get "/latest", routesBlogs.latestBlogs
app.get "/latest/blogs", routesBlogs.latestBlogs
app.get "/latest/texts", routesBlogs.latestTexts

app.get "/api/statistics", routesApi.statistics


cluster = require("cluster")
numCPUs = require("os").cpus().length
if cluster.isMaster
  i = 0
  while i < numCPUs
    cluster.fork()
    i++
  cluster.on "exit", (worker, code, signal) ->
    console.log "worker " + worker.process.pid + " died"
    # Might not work with forever
    #cluster.fork()
else
  http.createServer(app).listen app.get("port"), ->
    console.log "Express server listening on port " + app.get("port")