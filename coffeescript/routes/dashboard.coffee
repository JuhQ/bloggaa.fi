mongoose = require('mongoose')

exports.index = (req, res) ->
  return res.redirect "/" unless req.session.user
  
  Blog = mongoose.model 'blogs'
  Blog.findOne({
    user: req.session.user.id
  }).exec (err, blogData) ->
    if blogData
      Blogs = mongoose.model 'blogposts'
      Blogs.find({
        blog: blogData._id
        hidden: false
      }).sort('-added').exec (err, data) ->

        res.render "dashboard",
          title: "Bloggaa.fi"
          data: data
          session: req.session