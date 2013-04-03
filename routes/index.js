(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    console.log(req.session);
    return res.render("index", {
      title: "Bloggaa.fi",
      meta: "",
      blog: ""
    });
  };

  exports.settings = function(req, res) {
    if (!req.session.user_id) {
      res.redirect("/");
      return;
    }
    return res.render("settings", {
      meta: "",
      title: "Asetukset - Bloggaa.fi"
    });
  };

  exports.saveSettings = function(req, res) {
    var Blog, blogName, blogtitle;

    if (!req.session.user_id) {
      res.redirect("/");
      return;
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

}).call(this);
