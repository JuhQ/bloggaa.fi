mongoose = require('mongoose')

exports.index = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  options =
    title: "Bloggaa.fi"
    domain: domain
    session: req.session
    error: null

  if req.session.user
    Blog = mongoose.model 'blogs'
    Blog.findOne({
      user: req.session.user.id
    }).exec (err, blog) ->
      if blog
        options.blogUrl = blog.url
        res.render "index", options
  else
    res.render "landingpage-index", options

exports.settings = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, data) ->
    console.log data
    res.render "settings",
      title: "Asetukset - Bloggaa.fi"
      session: req.session
      blog: data

exports.saveAccountSettings = (req, res) ->
  res.send "Hello world"

exports.saveSettings = (req, res) ->
  return res.redirect "/" unless req.session.user
  url = req.body.name.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
    _id: req.body.id
  }).exec (err, data) ->
    return res.redirect "/" unless data
    Blog.update { _id: data._id },
      $set:
        name: req.body.name
        url: url
        disqus: req.body.disqus
        googleanalytics: req.body.googleanalytics
        facebookComments: req.body.facebookComments
        theme: req.body.theme
        sidebar: req.body.sidebar
        description: req.body.description
        addthis: req.body.addthis
        titlefont: req.body.titlefont
        contentfont: req.body.contentfont
    , () ->
      Blog.findOne({
        user: req.session.user.id
        _id: req.body.id
      }).exec (err, data) ->
        res.render "settings",
          title: "Asetukset tallennettu - Bloggaa.fi"
          session: req.session
          blog: data
