(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    var Blog, domain, options;

    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    options = {
      title: "Bloggaa.fi",
      meta: "",
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
    if (!req.session.user_id) {
      return res.redirect("/");
    }
    return res.render("settings", {
      meta: "",
      title: "Asetukset - Bloggaa.fi"
    });
  };

  exports.saveSettings = function(req, res) {
    var Blog, blogName, blogtitle;

    if (!req.session.user_id) {
      return res.redirect("/");
    }
    blogName = req.params.blog.toLowerCase();
    blogtitle = req.params.blog;
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      url: blogName,
      title: blogtitle
    }).exec(function(err, data) {
      if (!data) {
        Blog.update({
          _id: data._id
        }, {
          $set: {
            url: blogName,
            title: blogtitle
          }
        });
      }
      return res.render("settings", {
        meta: "",
        title: "Asetukset tallennettu - Bloggaa.fi"
      });
    });
  };

}).call(this);
