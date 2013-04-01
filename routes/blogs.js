(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    return res.render("index", {
      title: "Bloggaa.fi",
      meta: "",
      blog: ""
    });
  };

  exports.blogs = function(req, res) {};

  exports.showblog = function(req, res) {
    var Blog, blogName, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    blogName = req.params.blog.toLowerCase();
    Blog = mongoose.model('blogs');
    Blog.findOne({
      url: blogName
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        Blogs = mongoose.model('blogs');
        Blogs.find({
          blog: blogData._id
        }).exec(function(err, data) {
          if (data) {
            res.render("blogposts", {
              title: "Bloggaa.fi",
              data: data,
              meta: "",
              blog: blogName
            });
          }
          if (!data) {
            return res.render("nocontent", {
              title: "Bloggaa.fi",
              meta: "",
              blog: blogName,
              domain: domain
            });
          }
        });
      }
      if (!blogData) {
        return res.render("blog-not-found", {
          title: "Bloggaa.fi",
          meta: "",
          blog: blogName,
          domain: domain
        });
      }
    });
  };

  exports.showpost = function(req, res) {
    var Blog, blogName, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    blogName = req.params.blog.toLowerCase();
    Blog = mongoose.model('blogs');
    Blog.findOne({
      url: req.params.blog.toLowerCase()
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        Blogs = mongoose.model('blogposts');
        Blogs.findOne({
          blog: blogData._id,
          hidden: false,
          url: req.params.title.toLowerCase()
        }).exec(function(err, data) {
          if (data) {
            res.render("blogpost", {
              title: data.title + " - Bloggaa.fi",
              meta: "",
              data: data,
              blog: blogName
            });
          }
          if (!data) {
            return res.render("nocontent", {
              title: "Bloggaa.fi",
              meta: "",
              blog: blogName
            });
          }
        });
      }
      if (!blogData) {
        return res.render("blog-not-found", {
          title: "Bloggaa.fi",
          meta: "",
          blog: blogName,
          domain: domain
        });
      }
    });
  };

}).call(this);
