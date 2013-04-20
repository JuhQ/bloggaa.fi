mongoose = require('mongoose')

exports.index = (req, res) ->
  return res.redirect "/dashboard" if req.session.user
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  res.render "landingpage-index",
    title: "Bloggaa.fi"

exports.settings = (req, res) ->
  return res.redirect "/" unless req.session.user
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, data) ->
    res.render "settings",
      title: "Asetukset - Bloggaa.fi"
      session: req.session
      blog: data
      domain: domain

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
