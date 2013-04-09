mongoose = require('mongoose')

exports.write = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blog) ->
    return res.redirect "/" unless blog

    res.render "blogeditor",
      title: "Kirjoita - Bloggaa.fi"
      meta: ""
      blogTitle: ""
      blogContent: ""
      action: "saveBlog"
      blogid: blog._id

exports.saveBlog = (req, res) ->
  return res.redirect "/" unless req.session.user
  url = req.body.title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')
  Blogs = mongoose.model 'blogposts'
  blog = new Blogs
    title: req.body.title
    url: url
    content: req.body.content
    added: new Date()
    hidden: req.body.hidden is 1
    visits: 0
    user: req.session.user.id
    blog: req.body.blogid
  blog.save (err) ->
    res.redirect "/"

exports.edit = (req, res) ->
  return res.redirect "/" unless req.session.user
  res.render "blogeditor",
    title: "Muokkaus - Bloggaa.fi"
    meta: ""
    blogTitle: "title"
    blogContent: "content"
    action: "saveEdit"

exports.saveEdit = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogs'

  url = req.body.title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog.update { _id: req.body.id, user: req.session.user.id },
    $set:
      edited: new Date()
      title: req.body.title
      url: req.body.title.toLowerCase()
      content: req.body.content
      hidden: req.body.hidden is 1

exports.blogs = (req, res) ->

exports.showblog = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  
  blogName = req.params.blog.toLowerCase()
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: blogName
  }).exec (err, blogData) ->
    if blogData
      Blogs = mongoose.model 'blogposts'
      Blogs.find({
        blog: blogData._id
      }).exec (err, data) ->
        if data
          title = ""
          title = blogData.title + " - " if blogData.title

          res.render "themes/default/blogposts",
            title: title + "Bloggaa.fi"
            data: data
            meta: ""
            blog: blogName
        unless data
          res.render "themes/default/nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blogName
            domain: domain

    unless blogData
      res.render "themes/default/blog-not-found",
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
          res.render "themes/default/blogpost",
            title: data.title + " - Bloggaa.fi"
            meta: ""
            data: data
            blog: blogName

        unless data
          res.render "themes/default/nocontent",
            title: "Bloggaa.fi"
            meta: ""
            blog: blogName

    unless blogData
      res.render "themes/default/blog-not-found",
        title: "Bloggaa.fi"
        meta: ""
        blog: blogName
        domain: domain
  return

exports.latestBlogs = (req, res) ->
  res.send "hello"
exports.latestTexts = (req, res) ->
  res.send "hello"
