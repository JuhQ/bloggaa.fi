mongoose = require('mongoose')

exports.index = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  options =
    title: "Bloggaa.fi"
    meta: ""
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
  return res.redirect "/" unless req.session.user_id
  res.render "settings",
    meta: ""
    title: "Asetukset - Bloggaa.fi"

exports.saveSettings = (req, res) ->
  return res.redirect "/" unless req.session.user_id

  blogName = req.params.blog.toLowerCase()
  blogtitle = req.params.blog

  Blog = mongoose.model 'blogs'

  # TODO get blog id and userid
  Blog.findOne({
    url: blogName
    title: blogtitle
  }).exec (err, data) ->
    unless data
      Blog.update { _id: data._id }, { $set: { url: blogName, title: blogtitle }}

    res.render "settings",
      meta: ""
      title: "Asetukset tallennettu - Bloggaa.fi"
