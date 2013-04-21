(function() {
  var addthis, facebookComments, moment, mongoose, search, visitlog;

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

  exports.postSearch = function(req, res) {
    return res.redirect("/search/" + req.body.query);
  };

  search = function(req, res, field) {
    var Blog, domain, options;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    Blog = mongoose.model('blogposts');
    options = {};
    options[field] = {
      $regex: req.params.tag
    };
    return Blog.find(options).exec(function(err, data) {
      return res.render("search", {
        title: "Bloggaa.fi",
        session: req.session,
        data: data,
        domain: domain
      });
    });
  };

  exports.tagSearch = function(req, res) {
    return search(req, res, "tags");
  };

  exports.search = function(req, res) {
    return search(req, res, "content");
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
      if (!(blog && blog.length)) {
        return res.redirect("/asd");
      }
      console.log(req.params);
      return Blog.findOne({
        _id: req.params.id
      }).exec(function(err, reblog) {
        console.log(reblog);
        if (!(reblog && reblog.length)) {
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
    var Blog, url;

    if (!req.session.user) {
      return res.redirect("/");
    }
    url = req.body.title.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blogData) {
      var Blogs, blog;

      if (!blogData) {
        return res.redirect("/");
      }
      Blogs = mongoose.model('blogposts');
      blog = new Blogs({
        title: req.body.title,
        url: url,
        content: req.body.content,
        subdomain: blogData.url,
        added: new Date(),
        tags: req.body.tags,
        hidden: req.body.hidden === 1,
        visits: 0,
        user: req.session.user.id,
        blog: req.body.blogid
      });
      return blog.save(function(err) {
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
    }).exec(function(err, blogData) {
      var Blogs;

      if (!blogData) {
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
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blogData) {
      var title, url;

      if (!blog) {
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
          subdomain: blogData.url,
          tags: req.body.tags,
          content: req.body.content,
          hidden: req.body.hidden === 1
        }
      }, function() {
        return res.redirect("/dashboard");
      });
    });
  };

  exports.showblog = function(req, res) {
    var Blog, blogName, domain, limit, offset, page;

    limit = 5;
    offset = 0;
    page = 0;
    if (req.params.page) {
      page = Number(req.params.page);
      offset = page * limit;
    }
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
        }).sort('-added').skip(offset).limit(limit).exec(function(err, data) {
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
              session: req.session,
              page: page
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
            /*
            # Next blog post
            Blogs.findOne().where('added').gt(data.added).sort("added").limit(1).exec (err, data) ->
            # Previous blog post
            Blogs.findOne().where('added').gt(data.added).sort("-added").limit(1).exec (err, data) ->
            */

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
      if (!data) {
        return res.redirect("/");
      }
      return res.render("latestsblogposts", {
        title: "Uusimmat kirjoitukset - Bloggaa.fi",
        data: data,
        domain: domain,
        moment: moment,
        session: req.session
      });
    });
  };

}).call(this);
