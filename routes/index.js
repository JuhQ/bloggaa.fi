(function() {
  var authenticate, login, mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    return res.render("index", {
      title: "Bloggaa.fi",
      meta: "",
      blog: ""
    });
  };

  exports.register = function(req, res) {
    return res.render("register", {
      meta: "",
      title: "Rekisteröinti - Bloggaa.fi"
    });
  };

  exports.blogs = function(req, res) {};

  exports.showblog = function(req, res) {
    var Blog, blogName;

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
              title: data.title,
              data: data,
              meta: "",
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
          blog: blogName
        });
      }
    });
  };

  exports.showpost = function(req, res) {
    var Blog, blogName;

    blogName = req.params.blog.toLowerCase();
    Blog = mongoose.model('blogs');
    Blog.findOne({
      url: req.params.blog.toLowerCase()
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        Blogs = mongoose.model('blogs');
        Blogs.findOne({
          blog: blogData._id,
          url: req.params.title.toLowerCase()
        }).exec(function(err, data) {
          if (data) {
            res.render("blogpost", {
              title: "Bloggaa.fi",
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
          blog: blogName
        });
      }
    });
  };

  exports.picture = function(req, res) {
    var id, pics;

    id = req.params.id.toLowerCase() + '.' + req.params.type.toLowerCase();
    pics = mongoose.model('pics');
    return pics.findOne({
      filename_lowercase: id
    }).exec(function(err, data) {
      var meta;

      if (data) {
        meta = {};
        meta['og:image'] = 'http://cdn.userpics.com/medium/' + data.filename;
        meta.keywords = data.filename + ', hakusanoja';
        meta['og:title'] = data.title;
        return res.render("index", {
          title: meta['og:title'] + " - Userpics.com",
          meta: meta
        });
      }
    });
  };

  authenticate = function(email, password, callback) {
    var Users, hash;

    hash = require("../utils/password").hash;
    Users = mongoose.model('users');
    return Users.findOne({
      email: email.toLowerCase()
    }).exec(function(err, data) {
      if (!data) {
        return callback(new Error("cannot find user"));
      }
      return hash(password, data.salt, function(err, salf, hash) {
        if (err) {
          return callback(err);
        }
        if (hash === data.password) {
          return callback(null, data);
        }
        return callback(new Error("invalid password"));
      });
    });
  };

  login = function(req, res) {
    return authenticate(req.body.email, req.body.password, function(err, user) {
      if (user) {
        return req.session.regenerate(function() {
          req.session.user = {
            email: user.email
          };
          res.redirect("/");
        });
      }
    });
  };

  exports.login = login;

  exports.logout = function(req, res) {
    delete req.session.user;
    return res.redirect("/");
  };

  exports.createAccount = function(req, res) {
    var hash;

    hash = require("../utils/password").hash;
    if (req.session.user_id) {
      res.jsonp({
        fail: "logged-in"
      });
      return;
    }
    if (!req.body.email || !req.body.password || !req.body.blogname) {
      console.log("No email, password or blogname");
      res.jsonp({
        fail: "empty-fields"
      });
      return;
    }
    /* this feature not supported yet
    if req.body.password isnt req.body.password2
      console.log "Passwords don't match"
      return
    */

    return hash(req.body.password, function(err, salt, password) {
      var Users;

      if (err) {
        throw err;
      }
      Users = mongoose.model('users');
      return Users.findOne({
        email: req.body.email.toLowerCase()
      }).exec(function(err, data) {
        var Blogs;

        if (data) {
          res.jsonp({
            fail: "email-taken"
          });
          return;
        }
        Blogs = mongoose.model('blogs');
        return Blogs.findOne({
          url: req.body.blogname.toLowerCase()
        }).exec(function(err, data) {
          var user;

          if (data) {
            res.jsonp({
              fail: "url-taken"
            });
            return;
          }
          user = new Users({
            email: req.body.email.toLowerCase(),
            password: password,
            salt: salt,
            added: new Date(),
            lastvisit: new Date()
          });
          return user.save(function(err) {
            var blog;

            Blogs = mongoose.model('blogs');
            blog = new Blogs({
              name: req.body.blogname,
              url: req.body.blogname.toLowerCase(),
              added: new Date()
            });
            blog.save();
            return login(req, res);
          });
        });
      });
    });
  };

}).call(this);
