(function() {
  define([], function() {
    return Backbone.Router.extend({
      routes: {
        "": "index",
        "write": "write"
      },
      index: function() {},
      write: function() {
        return console.log("writer");
      }
    });
  });

}).call(this);
