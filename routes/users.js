(function() {
  var Recaptcha, authenticate, login, mongoose;

  mongoose = require('mongoose');

  Recaptcha = require("recaptcha").Recaptcha;

  exports.register = function(req, res) {
    return res.render("register", {
      title: "Rekisteröinti - Bloggaa.fi",
      session: req.session
    });
  };

  exports.login = function(req, res) {
    var error;

    if (req.params.error) {
      error = 1;
    }
    return res.render("login", {
      title: "Kirjautuminen - Bloggaa.fi",
      error: error,
      session: req.session
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
        return res.redirect("/login/error");
      }
      return req.session.regenerate(function() {
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
    return res.redirect("/");
  };

  exports.createAccount = function(req, res) {
    var data, hash, recaptcha;

    hash = require("../utils/password").hash;
    if (req.session.user) {
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

    data = {
      remoteip: req.connection.remoteAddress,
      challenge: req.body.recaptcha_challenge_field,
      response: req.body.recaptcha_response_field
    };
    recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS", data);
    return recaptcha.verify(function(success, error_code) {
      if (!success) {
        res.redirect("/");
        return;
      }
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
              var blog, url;

              url = req.body.blogname.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
              Blogs = mongoose.model('blogs');
              blog = new Blogs({
                user: user._id,
                name: req.body.blogname,
                url: url,
                added: new Date(),
                theme: "default"
              });
              blog.save();
              return login(req, res);
            });
          });
        });
      });
    });
  };

}).call(this);
