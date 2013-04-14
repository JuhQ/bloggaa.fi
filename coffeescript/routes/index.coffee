mongoose = require('mongoose')

exports.index = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  options =
    title: "Bloggaa.fi"
    domain: domain
    session: req.session

  if req.session.user
    Blog = mongoose.model 'blogs'
    Blog.findOne({
      user: req.session.user.id
    }).exec (err, blog) ->
      if blog
        options.blogUrl = blog.url
        res.render "index", options
  else
    res.render "index", options

exports.settings = (req, res) ->
  return res.redirect "/" unless req.session.user.id
  res.render "settings",
    title: "Asetukset - Bloggaa.fi"
    session: req.session

exports.saveSettings = (req, res) ->
  return res.redirect "/" unless req.session.user.id

  blogName = req.body.blog.toLowerCase()
  blogtitle = req.body.blog
  url = req.body.blog.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog = mongoose.model 'blogs'

  # TODO get blog id and userid
  Blog.findOne({
    user: req.session.user.id
    _id: req.body.id
  }).exec (err, data) ->
    unless data
      Blog.update { _id: data._id },
        $set:
          name: req.body.name
          url: url
          disqus: req.body.disqus
          googleanalytics: req.body.googleanalytics
          sidebar: req.body.sidebar
          theme: req.body.theme
          description: req.body.description
      , () ->
        res.render "settings",
          title: "Asetukset tallennettu - Bloggaa.fi"
          session: req.session
