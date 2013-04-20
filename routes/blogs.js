(function() {
  var addthis, facebookComments, moment, mongoose, visitlog;

  mongoose = require('mongoose');

  moment = require('moment');

  moment.lang("fi");

  facebookComments = 400504446723077;

  addthis = "ra-4e04fe637cc97ed4";

  visitlog = function(blog, post, req) {
    var Blog, Log, ip, log;

    ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;
    Log = mongoose.model('visits');
    log = new Log({
      blog: blog._id,
      user: blog.user,
      blogpost: post,
      date: new Date(),
      ip: ip
    });
    log.save(function(err) {});
    Blog = mongoose.model('blogs');
    return Blog.update({
      _id: blog._id
    }, {
      $inc: {
        visits: 1
      }
    }, function() {});
  };

  exports.reblog = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blog) {
      if (!blog) {
        return res.redirect("/asd");
      }
      console.log(req.params);
      return Blog.findOne({
        _id: req.params.id
      }).exec(function(err, reblog) {
        console.log(reblog);
        if (!reblog) {
          return res.redirect("/nope");
        }
        return res.render("blogeditorpage", {
          title: "Kirjoita - Bloggaa.fi",
          blogTitle: reblog.title,
          blogContent: '<blockquote><p>' + reblog.content + '<small>' + reblog.url + '</small></p></blockquote>',
          action: "saveBlog",
          url: blog.url,
          blogid: blog._id,
          session: req.session
        });
      });
    });
  };

  exports.like = function(req, res) {
    if (!req.session.user) {
      return res.redirect("/");
    }
    return res.send("hello");
  };

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
      return res.render("blogeditorpage", {
        title: "Kirjoita - Bloggaa.fi",
        blogTitle: "",
        blogContent: "",
        action: "saveBlog",
        url: blog.url,
        blogid: blog._id,
        session: req.session
      });
    });
  };

  exports.remove = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogposts');
    Blog.where('_id').equals(req.params.id).where('user').equals(req.session.user.id).remove();
    return res.redirect("/dashboard");
  };

  exports.hide = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogposts');
    return Blog.update({
      _id: req.params.id,
      user: req.session.user.id
    }, {
      $set: {
        hidden: true
      }
    }, function() {
      return res.redirect("/dashboard");
    });
  };

  exports.show = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogposts');
    return Blog.update({
      _id: req.params.id,
      user: req.session.user.id
    }, {
      $set: {
        hidden: false
      }
    }, function() {
      return res.redirect("/dashboard");
    });
  };

  exports.saveBlog = function(req, res) {
    var Blogs, blog, url;

    if (!req.session.user) {
      return res.redirect("/");
    }
    url = req.body.title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
    Blogs = mongoose.model('blogposts');
    blog = new Blogs({
      title: req.body.title,
      url: url,
      content: req.body.content,
      added: new Date(),
      hidden: req.body.hidden === 1,
      visits: 0,
      user: req.session.user.id,
      blog: req.body.blogid
    });
    return blog.save(function(err) {
      var Blog;

      Blog = mongoose.model('blogs');
      return Blog.update({
        _id: req.body.blogid,
        user: req.session.user.id
      }, {
        $set: {
          lastpost: new Date()
        }
      }, function() {
        return res.redirect("/dashboard");
      });
    });
  };

  exports.edit = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blog) {
      var Blogs;

      if (!blog) {
        return res.redirect("/");
      }
      Blogs = mongoose.model('blogposts');
      return Blogs.findOne({
        _id: req.params.id,
        user: req.session.user.id
      }).exec(function(err, data) {
        if (!data) {
          return res.redirect("/");
        }
        if (data) {
          return res.render("blogeditorpage", {
            title: "Muokkaus - Bloggaa.fi",
            blogid: data._id,
            blogTitle: data.title,
            blogContent: data.content,
            url: blog.url,
            action: "saveEdit/" + data._id,
            session: req.session
          });
        }
      });
    });
  };

  exports.saveEdit = function(req, res) {
    var Blog, title, url;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogposts');
    title = req.body.title;
    url = title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
    return Blog.update({
      _id: req.body.blogid,
      user: req.session.user.id
    }, {
      $set: {
        edited: new Date(),
        title: title,
        url: url,
        content: req.body.content,
        hidden: req.body.hidden === 1
      }
    }, function() {
      return res.redirect("/dashboard");
    });
  };

  exports.showblog = function(req, res) {
    var Blog, blogName, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    blogName = req.params.blog.toLowerCase();
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      url: blogName
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        if (blogData.theme.match("simple-")) {
          blogData.css = blogData.theme.replace("simple-", "");
          blogData.theme = "default";
        }
        Blogs = mongoose.model('blogposts');
        Blogs.find({
          blog: blogData._id,
          hidden: false
        }).sort('-added').exec(function(err, data) {
          var title;

          if (data) {
            visitlog(blogData, data._id, req);
            title = "";
            if (blogData.name) {
              title = blogData.name + " - ";
            }
            blogData.addthis = blogData.addthis || addthis;
            blogData.sidebar = blogData.sidebar || "";
            blogData.facebookComments = blogData.facebookComments || facebookComments;
            res.render("themes/" + blogData.theme + "/blogposts", {
              title: title + "Bloggaa.fi",
              blog: blogData,
              data: data,
              moment: moment,
              domain: domain,
              session: req.session
            });
          }
          if (!data) {
            return res.render("themes/" + blogData.theme + "/nocontent", {
              title: "Bloggaa.fi",
              domain: domain,
              blogName: blogName,
              blog: {},
              session: req.session
            });
          }
        });
      }
      if (!blogData) {
        return res.render("themes/default/blog-not-found", {
          title: "Bloggaa.fi",
          domain: domain,
          blog: {},
          blogName: req.subdomains[0],
          session: req.session
        });
      }
    });
  };

  exports.showpost = function(req, res) {
    var Blog, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      url: req.params.blog.toLowerCase()
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        if (blogData.theme.match("simple-")) {
          blogData.css = blogData.theme.replace("simple-", "");
          blogData.theme = "default";
        }
        Blogs = mongoose.model('blogposts');
        Blogs.findOne({
          blog: blogData._id,
          hidden: false,
          url: req.params.title.toLowerCase()
        }).exec(function(err, data) {
          if (data) {
            visitlog(blogData, data._id, req);
            Blogs.update({
              _id: data._id
            }, {
              $inc: {
                visits: 1
              }
            }, function() {});
            blogData.addthis = blogData.addthis || addthis;
            blogData.sidebar = blogData.sidebar || "";
            blogData.facebookComments = blogData.facebookComments || facebookComments;
            res.render("themes/" + blogData.theme + "/blogpost", {
              title: data.title + " - Bloggaa.fi",
              data: data,
              blog: blogData,
              moment: moment,
              domain: domain,
              session: req.session
            });
          }
          if (!data) {
            return res.render("themes/" + blogData.theme + "/nocontent", {
              title: "Bloggaa.fi",
              blog: {},
              blogName: req.subdomains[0],
              domain: domain,
              session: req.session
            });
          }
        });
      }
      if (!blogData) {
        return res.render("themes/default/blog-not-found", {
          title: "Bloggaa.fi",
          domain: domain,
          blog: {},
          blogName: req.subdomains[0],
          session: req.session
        });
      }
    });
  };

  exports.latestBlogs = function(req, res) {
    var Blog, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    Blog = mongoose.model('blogs');
    return Blog.find().sort('-added').exec(function(err, data) {
      if (!data) {
        return res.redirect("/");
      }
      return res.render("latestsblogs", {
        title: "Uusimmat blogit - Bloggaa.fi",
        data: data,
        domain: domain,
        moment: moment,
        session: req.session
      });
    });
  };

  exports.latestTexts = function(req, res) {
    var Blogs, domain;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    Blogs = mongoose.model('blogposts');
    return Blogs.find().sort('-added').exec(function(err, data) {
      var subdomain;

      if (!data) {
        return res.redirect("/");
      }
      subdomain = "juha";
      return res.render("latestsblogposts", {
        title: "Uusimmat kirjoitukset - Bloggaa.fi",
        data: data,
        subdomain: subdomain,
        domain: domain,
        moment: moment,
        session: req.session
      });
    });
  };

}).call(this);
