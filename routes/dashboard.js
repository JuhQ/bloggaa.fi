(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    var Blog, domain;

    if (!req.session.user) {
      return res.redirect("/");
    }
    domain = req.get('host').replace(req.subdomains[0] + ".", "");
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blog) {
      var Blogs;

      if (blog) {
        Blogs = mongoose.model('blogposts');
        return Blogs.find({
          blog: blog._id
        }).sort('-added').exec(function(err, data) {
          return res.render("dashboard", {
            title: "Bloggaa.fi",
            data: data,
            session: req.session,
            blogTitle: "",
            blogContent: "",
            action: "saveBlog",
            domain: domain,
            url: blog.url,
            blogid: blog._id
          });
        });
      }
    });
  };

}).call(this);
