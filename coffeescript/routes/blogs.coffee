mongoose = require('mongoose')
moment = require('moment')
moment.lang("fi")

exports.write = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blog) ->
    return res.redirect "/" unless blog

    res.render "blogeditor",
      title: "Kirjoita - Bloggaa.fi"
      blogTitle: ""
      blogContent: ""
      action: "saveBlog"
      blogid: blog._id
      session: req.session

exports.remove = (req, res) ->
  return res.redirect "/" unless req.session.user

  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  blogName = req.params.blog.toLowerCase()
  Blog = mongoose.model 'blogs'
  Blog.where('_id').equals(req.params.id).remove()
  res.redirect "/dashboard"

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

    Blog = mongoose.model 'blogs'
    Blog.update { _id: req.body.blogid },
      $set:
        lastpost: new Date()

    res.redirect "/"

exports.edit = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blogs = mongoose.model 'blogposts'
  Blogs.findOne({
    _id: req.params.id
    user: req.session.user.id
  }).exec (err, data) ->
    return res.redirect "/" unless data
    if data
      res.render "blogeditor",
        title: "Muokkaus - Bloggaa.fi"
        blogid: data._id
        blogTitle: data.title
        blogContent: data.content
        action: "saveEdit/" + data._id
        session: req.session

exports.saveEdit = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogposts'

  title = req.body.title
  url = title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog.update { _id: req.body.blogid, user: req.session.user.id },
    $set:
      edited: new Date()
      title: title
      url: url
      content: req.body.content
      hidden: req.body.hidden is 1
  , () ->
    res.redirect "/dashboard"

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
        hidden: false
      }).sort('-added').exec (err, data) ->
        if data
          title = ""
          title = blogData.title + " - " if blogData.title

          res.render "themes/kukkatheme/blogposts",
            title: title + "Bloggaa.fi"
            data: data
            blog: blogName
            moment: moment
            domain: domain
            session: req.session
        unless data
          res.render "themes/kukkatheme/nocontent",
            title: "Bloggaa.fi"
            blog: blogName
            domain: domain
            session: req.session

    unless blogData
      res.render "themes/kukkatheme/blog-not-found",
        title: "Bloggaa.fi"
        blog: blogName
        domain: domain
        session: req.session

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
          res.render "themes/kukkatheme/blogpost",
            title: data.title + " - Bloggaa.fi"
            data: data
            blog: blogName
            moment: moment
            domain: domain
            session: req.session

        unless data
          res.render "themes/kukkatheme/nocontent",
            title: "Bloggaa.fi"
            blog: blogName
            session: req.session

    unless blogData
      res.render "themes/kukkatheme/blog-not-found",
        title: "Bloggaa.fi"
        blog: blogName
        domain: domain
        session: req.session

exports.latestBlogs = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  Blog = mongoose.model 'blogs'
  Blog.find().sort('-added').exec (err, data) ->
    return res.redirect "/" unless data
    res.render "latestsblogs",
      title: "Uusimmat blogit - Bloggaa.fi"
      data: data
      domain: domain
      moment: moment
      session: req.session

exports.latestTexts = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  Blogs = mongoose.model 'blogposts'
  Blogs.find().sort('-added').exec (err, data) ->
    return res.redirect "/" unless data
    res.render "latestsblogposts",
      title: "Uusimmat kirjoitukset - Bloggaa.fi"
      data: data
      domain: domain
      moment: moment
      session: req.session
