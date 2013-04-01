express = require("express")
routes = require("./routes")
http = require("http")
mongoose = require('mongoose')
app = express()

##
# RUN THIS git push -u origin master
##

app.configure ->
  app.set "port", process.env.PORT or 4001
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  #app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("bloggaa.fi is awesome")
  app.use express.session()
  app.use app.router

app.configure "development", ->
  app.use express.errorHandler()

blogSchema = mongoose.Schema {
  name: 'String'
  url: 'String'
  added: 'Date'
  lastpost: 'Date'
}
blogPostSchema = mongoose.Schema {
  title: 'String'
  content: 'String'
  added: 'Date'
  hidden: 'Boolean'
  visits: 'Number'
  user: 'ObjectId'
  blog: 'ObjectId'
}
userSchema = mongoose.Schema {
  email: 'String'
  password: 'String'
  salt: 'String'
  added: 'Date'
  lastvisit: 'Date'
  lastpost: 'Date'
}
mongoose.model 'blogs', blogSchema
mongoose.model 'blogposts', blogPostSchema
mongoose.model 'users', userSchema
mongoose.connect 'localhost', 'bloggaa'

app.get "/", routes.index
app.get "/register", routes.register
app.post "/register", routes.createAccount
app.get "/blog", routes.blogs
app.get "/blog/:blog", routes.showblog
app.get "/blog/:blog/title/:title", routes.showpost

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")