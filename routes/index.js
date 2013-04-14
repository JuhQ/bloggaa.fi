(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    var Blog, domain, options;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    options = {
      title: "Bloggaa.fi",
      domain: domain,
      session: req.session
    };
    if (req.session.user) {
      Blog = mongoose.model('blogs');
      return Blog.findOne({
        user: req.session.user.id
      }).exec(function(err, blog) {
        if (blog) {
          options.blogUrl = blog.url;
          return res.render("index", options);
        }
      });
    } else {
      return res.render("index", options);
    }
  };

  exports.settings = function(req, res) {
    if (!req.session.user.id) {
      return res.redirect("/");
    }
    return res.render("settings", {
      title: "Asetukset - Bloggaa.fi",
      session: req.session
    });
  };

  exports.saveSettings = function(req, res) {
    var Blog, blogName, blogtitle, url;

    if (!req.session.user.id) {
      return res.redirect("/");
    }
    blogName = req.body.blog.toLowerCase();
    blogtitle = req.body.blog;
    url = req.body.blog.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id,
      _id: req.body.id
    }).exec(function(err, data) {
      if (!data) {
        return Blog.update({
          _id: data._id
        }, {
          $set: {
            name: req.body.name,
            url: url,
            disqus: req.body.disqus,
            googleanalytics: req.body.googleanalytics,
            sidebar: req.body.sidebar,
            theme: req.body.theme,
            description: req.body.description
          }
        }, function() {
          return res.render("settings", {
            title: "Asetukset tallennettu - Bloggaa.fi",
            session: req.session
          });
        });
      }
    });
  };

}).call(this);
