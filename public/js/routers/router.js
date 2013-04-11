(function() {
  define(["views/write"], function(WriteView) {
    return Backbone.Router.extend({
      routes: {
        "": "index",
        "write": "write",
        "edit": "write",
        "edit/:id": "write"
      },
      index: function() {},
      write: function() {
        return new WriteView();
      }
    });
  });

}).call(this);
