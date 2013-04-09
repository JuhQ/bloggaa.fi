(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.write = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blog) {
      if (!blog) {
        return res.redirect("/");
      }
      return res.render("blogeditor", {
        title: "Kirjoita - Bloggaa.fi",
        meta: "",
        blogTitle: "title",
        blogContent: "content",
        action: "saveBlog",
        blogid: blog._id
      });
    });
  };

  exports.saveBlog = function(req, res) {
    var Blogs, blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blogs = mongoose.model('blogposts');
    blog = new Blogs({
      title: req.body.title,
      url: req.body.title.toLowerCase(),
      content: req.body.content,
      added: new Date(),
      hidden: req.body.hidden === 1,
      visits: 0,
      user: req.session.user.id,
      blog: req.body.blogid
    });
    return blog.save(function(err) {
      return res.redirect("/");
    });
  };

  exports.edit = function(req, res) {
    if (!req.session.user) {
      return res.redirect("/");
    }
    return res.render("blogeditor", {
      title: "Muokkaus - Bloggaa.fi",
      meta: "",
      blogTitle: "title",
      blogContent: "content",
      action: "saveEdit"
    });
  };

  exports.saveEdit = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.update({
      _id: req.body.id,
      user: req.session.user.id
    }, {
      $set: {
        edited: new Date(),
        title: req.body.title,
        url: req.body.id.toLowerCase(),
        content: req.body.content,
        hidden: req.body.hidden === 1
      }
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
        Blogs = mongoose.model('blogposts');
        Blogs.find({
          blog: blogData._id
        }).exec(function(err, data) {
          var title;

          if (data) {
            title = "";
            if (blogData.title) {
              title = blogData.title + " - ";
            }
            res.render("themes/default/blogposts", {
              title: title + "Bloggaa.fi",
              data: data,
              meta: "",
              blog: blogName
            });
          }
          if (!data) {
            return res.render("themes/default/nocontent", {
              title: "Bloggaa.fi",
              meta: "",
              blog: blogName,
              domain: domain
            });
          }
        });
      }
      if (!blogData) {
        return res.render("themes/default/blog-not-found", {
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
            res.render("themes/default/blogpost", {
              title: data.title + " - Bloggaa.fi",
              meta: "",
              data: data,
              blog: blogName
            });
          }
          if (!data) {
            return res.render("themes/default/nocontent", {
              title: "Bloggaa.fi",
              meta: "",
              blog: blogName
            });
          }
        });
      }
      if (!blogData) {
        return res.render("themes/default/blog-not-found", {
          title: "Bloggaa.fi",
          meta: "",
          blog: blogName,
          domain: domain
        });
      }
    });
  };

  exports.latestBlogs = function(req, res) {
    return res.send("hello");
  };

  exports.latestTexts = function(req, res) {
    return res.send("hello");
  };

}).call(this);
