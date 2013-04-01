(function() {
  define([], function() {
    return Backbone.Router.extend({
      routes: {
        "": "index"
      },
      index: function() {}
    });
  });

}).call(this);
