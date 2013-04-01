mongoose = require('mongoose')

exports.index = (req, res) ->
  res.render "index",
    title: "Bloggaa.fi"
    meta: ""
    blog: ""

    
exports.blogs = (req, res) ->

exports.showblog = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  
  blogName = req.params.blog.toLowerCase()
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: blogName
  }).exec (err, blogData) ->
    if blogData
      Blogs = mongoose.model 'blogs'
      Blogs.find({
        blog: blogData._id
      }).exec (err, data) ->
        if data
          res.render "blogposts",
            title: "Bloggaa.fi"
            data: data
            meta: ""
            blog: blogName
        unless data
          res.render "nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blogName
            domain: domain

    unless blogData
      res.render "blog-not-found",
        title: "Bloggaa.fi"
        meta: ""
        blog: blogName
        domain: domain

  return

exports.showpost = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  blogName = req.params.blog.toLowerCase()
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: req.params.blog.toLowerCase()
  }).exec (err, blogData) ->
    if blogData

      Blogs = mongoose.model 'blogposts'
      Blogs.findOne({
        blog: blogData._id
        hidden: false
        url: req.params.title.toLowerCase()
      }).exec (err, data) ->
        if data
          res.render "blogpost",
            title: data.title + " - Bloggaa.fi"
            meta: ""
            data: data
            blog: blogName

        unless data
          res.render "nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blogName

    unless blogData
      res.render "blog-not-found",
        title: "Bloggaa.fi"
        meta: ""
        blog: blogName
        domain: domain
  return
