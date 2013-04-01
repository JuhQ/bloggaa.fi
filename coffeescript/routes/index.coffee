mongoose = require('mongoose')

exports.settings = (req, res) ->
  unless req.session.user_id
    res.redirect "/"
    return
  res.render "settings",
    meta: ""
    title: "Asetukset - Bloggaa.fi"

exports.saveSettings = (req, res) ->
  unless req.session.user_id
    res.redirect "/"
    return

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
