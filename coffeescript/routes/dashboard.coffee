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
          blogTitle: ""
          blogContent: ""
          action: "saveBlog"
          domain: domain
          url: blog.url
          blogid: blog._id