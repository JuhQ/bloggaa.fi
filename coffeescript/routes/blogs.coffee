mongoose = require('mongoose')
moment = require('moment')
moment.lang("fi")

facebookComments = 400504446723077
addthis = "ra-4e04fe637cc97ed4"

visitlog = (blog, post, req) ->
  ip = req.headers['X-Forwarded-For'] or req.connection.remoteAddress
  Log = mongoose.model 'visits'
  log = new Log
    blog: blog._id
    user: blog.user
    blogpost: post
    date: new Date()
    ip: ip
  log.save (err) ->
  Blog = mongoose.model 'blogs'
  Blog.update { _id: blog._id }, $inc: visits: 1, () ->

exports.tagSearch = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  Blog = mongoose.model 'blogposts'
  Blog.find(
    tags: $regex: req.params.tag
  ).exec (err, data) ->
    console.log data
    return res.send "nope" unless data and data.length
    return res.redirect "/" unless data and data.length
    res.render "tagsearch",
      title: "Bloggaa.fi"
      session: req.session
      data: data
      domain: domain

exports.reblog = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blog) ->
    return res.redirect "/asd" unless blog and blog.length
    console.log req.params
    Blog.findOne({
      _id: req.params.id
    }).exec (err, reblog) ->
      console.log reblog
      return res.redirect "/nope" unless reblog and reblog.length

      res.render "blogeditorpage",
        title: "Kirjoita - Bloggaa.fi"
        blogTitle: reblog.title
        blogContent: '<blockquote><p>' + reblog.content + '<small>' + reblog.url + '</small></p></blockquote>'
        action: "saveBlog"
        url: blog.url
        blogid: blog._id
        session: req.session

exports.like = (req, res) ->
  return res.redirect "/" unless req.session.user
  res.send "hello"

exports.write = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blog) ->
    return res.redirect "/" unless blog

    res.render "blogeditorpage",
      title: "Kirjoita - Bloggaa.fi"
      blogTitle: ""
      blogContent: ""
      action: "saveBlog"
      url: blog.url
      blogid: blog._id
      session: req.session

exports.remove = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogposts'
  Blog.where('_id').equals(req.params.id).where('user').equals(req.session.user.id).remove()
  res.redirect "/dashboard"

exports.hide = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogposts'
  Blog.update { _id: req.params.id, user: req.session.user.id },
    $set:
      hidden: true
  , () ->
    res.redirect "/dashboard"

exports.show = (req, res) ->
  return res.redirect "/" unless req.session.user
  Blog = mongoose.model 'blogposts'
  Blog.update { _id: req.params.id, user: req.session.user.id },
    $set:
      hidden: false
  , () ->
    res.redirect "/dashboard"

exports.saveBlog = (req, res) ->
  return res.redirect "/" unless req.session.user
  url = req.body.title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blogData) ->
    return res.redirect "/" unless blogData

    Blogs = mongoose.model 'blogposts'
    blog = new Blogs
      title: req.body.title
      url: url
      content: req.body.content
      subdomain: blogData.url
      added: new Date()
      tags: req.body.tags
      hidden: req.body.hidden is 1
      visits: 0
      user: req.session.user.id
      blog: req.body.blogid
    blog.save (err) ->
      Blog = mongoose.model 'blogs'
      Blog.update { _id: req.body.blogid, user: req.session.user.id },
        $set:
          lastpost: new Date()
      , () ->
        res.redirect "/dashboard"

exports.edit = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blogData) ->
    return res.redirect "/" unless blogData

    Blogs = mongoose.model 'blogposts'
    Blogs.findOne({
      _id: req.params.id
      user: req.session.user.id
    }).exec (err, data) ->
      return res.redirect "/" unless data
      if data
        res.render "blogeditorpage",
          title: "Muokkaus - Bloggaa.fi"
          blogid: data._id
          blogTitle: data.title
          blogContent: data.content
          url: blog.url
          action: "saveEdit/" + data._id
          session: req.session

exports.saveEdit = (req, res) ->
  return res.redirect "/" unless req.session.user

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blogData) ->
    return res.redirect "/" unless blog

    Blog = mongoose.model 'blogposts'

    title = req.body.title
    url = title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

    Blog.update { _id: req.body.blogid, user: req.session.user.id },
      $set:
        edited: new Date()
        title: title
        url: url
        subdomain: blogData.url
        tags: req.body.tags
        content: req.body.content
        hidden: req.body.hidden is 1
    , () ->
      res.redirect "/dashboard"

exports.showblog = (req, res) ->
  limit = 5
  offset = 0
  page = 0
  if req.params.page
    page = Number(req.params.page)
    offset = page * limit

  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  blogName = req.params.blog.toLowerCase()
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: blogName
  }).exec (err, blogData) ->
    if blogData
      if blogData.theme.match("simple-")
        blogData.css = blogData.theme.replace("simple-","")
        blogData.theme = "default"

      Blogs = mongoose.model 'blogposts'
      Blogs.find({
        blog: blogData._id
        hidden: false
      }).sort('-added').skip(offset).limit(limit).exec (err, data) ->
        if data
          visitlog(blogData, data._id, req)
          title = ""
          title = blogData.name + " - " if blogData.name
          blogData.addthis = blogData.addthis or addthis
          blogData.sidebar = blogData.sidebar or ""
          blogData.facebookComments = blogData.facebookComments or facebookComments
          
          res.render "themes/" + blogData.theme + "/blogposts",
            title: title + "Bloggaa.fi"
            blog: blogData
            data: data
            moment: moment
            domain: domain
            session: req.session
            page: page
        unless data
          res.render "themes/" + blogData.theme + "/nocontent",
            title: "Bloggaa.fi"
            domain: domain
            blogName: blogName
            blog: {}
            session: req.session

    unless blogData
      res.render "themes/default/blog-not-found",
        title: "Bloggaa.fi"
        domain: domain
        blog: {}
        blogName: req.subdomains[0]
        session: req.session

exports.showpost = (req, res) ->
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: req.params.blog.toLowerCase()
  }).exec (err, blogData) ->
    if blogData
      if blogData.theme.match("simple-")
        blogData.css = blogData.theme.replace("simple-","")
        blogData.theme = "default"
      Blogs = mongoose.model 'blogposts'
      Blogs.findOne({
        blog: blogData._id
        hidden: false
        url: req.params.title.toLowerCase()
      }).exec (err, data) ->
        if data

          ###
          # Next blog post
          Blogs.findOne().where('added').gt(data.added).sort("added").limit(1).exec (err, data) ->
          # Previous blog post
          Blogs.findOne().where('added').gt(data.added).sort("-added").limit(1).exec (err, data) ->
          ###

          # Save visit log
          visitlog(blogData, data._id, req)

          # update visit count for post
          Blogs.update { _id: data._id }, $inc: visits: 1, () ->

          blogData.addthis = blogData.addthis or addthis
          blogData.sidebar = blogData.sidebar or ""
          blogData.facebookComments = blogData.facebookComments or facebookComments
          res.render "themes/" + blogData.theme + "/blogpost",
            title: data.title + " - Bloggaa.fi"
            data: data
            blog: blogData
            moment: moment
            domain: domain
            session: req.session

        unless data
          res.render "themes/" + blogData.theme + "/nocontent",
            title: "Bloggaa.fi"
            blog: {}
            blogName: req.subdomains[0]
            domain: domain
            session: req.session

    unless blogData
      res.render "themes/default/blog-not-found",
        title: "Bloggaa.fi"
        domain: domain
        blog: {}
        blogName: req.subdomains[0]
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
