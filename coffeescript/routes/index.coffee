mongoose = require('mongoose')

exports.index = (req, res) ->
  res.render "index",
    title: "Bloggaa.fi"
    meta: ""
    blog: ""

# Prints registration form
exports.register = (req, res) ->
  res.render "register",
    meta: ""
    title: "Rekisteröinti - Bloggaa.fi"

exports.blogs = (req, res) ->

exports.showblog = (req, res) ->
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: req.params.blog.toLowerCase()
  }).exec (err, blogData) ->
    if blogData
      Blogs = mongoose.model 'blogs'
      Blogs.find({
        blog: blogData._id
      }).exec (err, data) ->
        if data
          res.render "blogposts",
            data: data
        unless data
          res.render "nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blog

    unless blogData
      res.render "blog-not-found",
        title: "Bloggaa.fi"
        meta: ""

  return

exports.showpost = (req, res) ->
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: req.params.blog.toLowerCase()
  }).exec (err, blogData) ->
    if blogData
      Blogs = mongoose.model 'blogs'
      Blogs.findOne({
        blog: blogData._id
        url: req.params.title.toLowerCase()
      }).exec (err, data) ->
        if data
          res.render "blogpost",
            title: "Bloggaa.fi"
            meta: ""
            data: data
        unless data
          res.render "nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blog

    unless blogData
      res.render "blog-not-found",
        title: "Bloggaa.fi"
        meta: ""
  return

exports.picture = (req, res) ->
  id = req.params.id.toLowerCase() + '.' + req.params.type.toLowerCase()
  pics = mongoose.model 'pics'
  pics.findOne({
    filename_lowercase: id
  }).exec (err, data) ->
    if data
      meta = {}
      meta['og:image'] = 'http://cdn.userpics.com/medium/' + data.filename
      meta.keywords = data.filename + ', hakusanoja'
      meta['og:title'] = data.title
      res.render "index",
        title: meta['og:title'] + " - Userpics.com"
        meta: meta


# Authenticate using our plain-object database of doom!
authenticate = (email, password, callback) ->
  hash = require("../utils/password").hash

  Users = mongoose.model 'users'
  Users.findOne({
    email: email.toLowerCase()
  }).exec (err, data) ->
    return callback(new Error("cannot find user")) unless data
      
    # apply the same algorithm to the POSTed password, applying
    # the hash against the password / salt, if there is a match we
    # found the user
    hash password, data.salt, (err, salf, hash) ->
      return callback(err) if err
      return callback(null, data) if hash is data.password
      callback new Error("invalid password")

login = (req, res) ->
  authenticate req.body.email, req.body.password, (err, user) ->
    if user
      # Regenerate session when signing in to prevent fixation
      req.session.regenerate ->
        req.session.user =
          email: user.email
        res.redirect "/"
        return

exports.login = login
exports.logout = (req, res) ->
  delete req.session.user
  res.redirect "/"

# Saves user to the database
exports.createAccount = (req, res) ->
  hash = require("../utils/password").hash

  if req.session.user_id
    res.jsonp fail: "logged-in"
    return

  if not req.body.email or not req.body.password or not req.body.blogname
    console.log "No email, password or blogname"
    res.jsonp fail: "empty-fields"
    return

  ### this feature not supported yet
  if req.body.password isnt req.body.password2
    console.log "Passwords don't match"
    return
  ###

  # when you create a user, generate a salt
  # and hash the password ('foobar' is the password here)
  hash req.body.password, (err, salt, password) ->
    throw err if err

    Users = mongoose.model 'users'
    Users.findOne({
      email: req.body.email.toLowerCase()
    }).exec (err, data) ->
      if data
        res.jsonp fail: "email-taken"
        return

      Blogs = mongoose.model 'blogs'
      Blogs.findOne({
        url: req.body.blogname.toLowerCase()
      }).exec (err, data) ->
        if data
          res.jsonp fail: "url-taken"
          return

        user = new Users
          email: req.body.email.toLowerCase()
          password: password
          salt: salt
          added: new Date()
          lastvisit: new Date()

        user.save (err) ->
          Blogs = mongoose.model 'blogs'
          blog = new Blogs
            name: req.body.blogname
            url: req.body.blogname.toLowerCase()
            added: new Date()

          blog.save()
          login req, res
        
