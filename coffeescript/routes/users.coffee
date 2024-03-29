mongoose = require('mongoose')
Recaptcha = require("recaptcha").Recaptcha

# Prints registration form
exports.register = (req, res) ->
  res.render "register",
    title: "Rekisteröinti - Bloggaa.fi"
    session: req.session

exports.login = (req, res) ->
  error = 1 if req.params.error
  res.render "login",
    title: "Kirjautuminen - Bloggaa.fi"
    error: error
    session: req.session

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
    return res.redirect "/login/error" unless user

    # Regenerate session when signing in to prevent fixation
    req.session.regenerate ->
      req.session.user =
        id: user._id
        email: user.email
      res.redirect "/"
      return

exports.handleLogin = login
exports.logout = (req, res) ->
  req.session.destroy()
  res.redirect "/"

# Saves user to the database
exports.createAccount = (req, res) ->
  hash = require("../utils/password").hash

  if req.session.user
    res.jsonp fail: "logged-in"
    return

  if not req.body.email or not req.body.password or not req.body.blogname
    console.log "No email, password or blogname"
    res.jsonp fail: "empty-fields"
    return

  # Check that blog url is available

  ### this feature not supported yet
  if req.body.password isnt req.body.password2
    console.log "Passwords don't match"
    return
  ###

  data =
    remoteip: req.connection.remoteAddress
    challenge: req.body.recaptcha_challenge_field
    response: req.body.recaptcha_response_field

  recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS", data)
  recaptcha.verify (success, error_code) ->
    unless success
      res.redirect "/"
      return

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
            url = req.body.blogname.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')
            Blogs = mongoose.model 'blogs'
            blog = new Blogs
              user: user._id
              name: req.body.blogname
              url: url
              added: new Date()
              theme: "default"

            blog.save()
            login req, res
