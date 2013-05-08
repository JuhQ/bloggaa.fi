(function() {
  var Recaptcha, mongoose;

  mongoose = require('mongoose');

  Recaptcha = require("recaptcha").Recaptcha;

  exports.index = function(req, res) {
    var domain, recaptcha;

    recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS");
    if (req.session.user) {
      return res.redirect("/dashboard");
    }
    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    return res.render("landingpage-index", {
      title: "Bloggaa.fi",
      recaptcha_form: recaptcha.toHTML()
    });
  };

  exports.saveAccountSettings = function(req, res) {
    return res.send("Hello world");
  };

  exports.saveSettings = function(req, res) {
    var Blog, url, urlBase;

    if (!req.session.user) {
      return res.redirect("/");
    }
    urlBase = req.body.name;
    if (req.body.url) {
      urlBase = req.body.url;
    }
    url = urlBase.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      url: url
    }).exec(function(err, data) {
      if (data && String(req.session.user.id) !== String(data.user)) {
        return res.redirect("/");
      }
      return Blog.findOne({
        user: req.session.user.id,
        _id: req.body.id
      }).exec(function(err, data) {
        if (!data) {
          return res.redirect("/");
        }
        return Blog.update({
          _id: data._id
        }, {
          $set: {
            name: req.body.name,
            url: url,
            disqus: req.body.disqus || "",
            commentsDisabled: Number(req.body.comments_disabled) === 1,
            googleanalytics: req.body.googleanalytics || "",
            facebookComments: req.body.facebookComments || "",
            theme: req.body.theme || "",
            sidebar: req.body.sidebar || "",
            description: req.body.description || "",
            addthis: req.body.addthis || "",
            titlefont: req.body.titlefont || "",
            contentfont: req.body.contentfont || ""
          }
        }, function() {
          return Blog.findOne({
            user: req.session.user.id,
            _id: req.body.id
          }).exec(function(err, data) {
            var Blogposts;

            Blogposts = mongoose.model('blogposts');
            return Blogposts.update({
              blog: data._id,
              user: req.session.user.id
            }, {
              $set: {
                subdomain: url
              }
            }, {
              multi: true
            }, function() {
              return res.render("settings", {
                title: "Asetukset tallennettu - Bloggaa.fi",
                session: req.session,
                blog: data
              });
            });
          });
        });
      });
    });
  };

}).call(this);
