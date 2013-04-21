(function() {
  define(["views/like"], function(LikeView) {
    return Backbone.Router.extend({
      routes: {
        "(/:blog)": "index"
      },
      index: function(blog) {
        return new LikeView({
          blog: blog
        });
      }
    });
  });

}).call(this);
