(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    var Blog;

    if (!req.session.user) {
      return res.redirect("/");
    }
    Blog = mongoose.model('blogs');
    return Blog.findOne({
      user: req.session.user.id
    }).exec(function(err, blogData) {
      var Blogs;

      if (blogData) {
        Blogs = mongoose.model('blogposts');
        return Blogs.find({
          blog: blogData._id,
          hidden: false
        }).sort('-added').exec(function(err, data) {
          return res.render("dashboard", {
            title: "Bloggaa.fi",
            data: data,
            meta: "",
            session: req.session
          });
        });
      }
    });
  };

}).call(this);
