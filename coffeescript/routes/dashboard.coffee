mongoose = require('mongoose')

exports.index = (req, res) ->
  return res.redirect "/" unless req.session.user
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blog) ->
    if blog
      Blogs = mongoose.model 'blogposts'
      Blogs.find({
        blog: blog._id
      }).sort('-added').exec (err, data) ->

        res.render "dashboard",
          title: "Bloggaa.fi"
          data: data
          session: req.session
          domain: domain
          blog: blog
          # blog editor needs these
          blogTitle: ""
          blogContent: ""
          action: "saveBlog"
          url: blog.url
          blogid: blog._id

exports.visits = (req, res) ->
  return res.redirect "/" unless req.session.user
  res.render "statistics",
    title: "Tilastot - Bloggaa.fi"
    session: req.session

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
