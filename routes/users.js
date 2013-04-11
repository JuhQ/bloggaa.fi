(function() {
  var authenticate, login, mongoose;

  mongoose = require('mongoose');

  exports.register = function(req, res) {
    return res.render("register", {
      meta: "",
      title: "Rekisteröinti - Bloggaa.fi"
    });
  };

  exports.login = function(req, res) {
    var error;

    if (req.params.error) {
      error = 1;
    }
    return res.render("login", {
      meta: "",
      title: "Kirjautuminen - Bloggaa.fi",
      error: error
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
      if (!user) {
        res.redirect("/login/error");
        return;
      }
      console.log("yayayayayaya login");
      return req.session.regenerate(function() {
        console.log("user", user);
        req.session.user = {
          id: user._id,
          email: user.email
        };
        res.redirect("/");
      });
    });
  };

  exports.handleLogin = login;

  exports.logout = function(req, res) {
    req.session.destroy();
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
              user: user._id,
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
