(function() {
  define(["views/write"], function(WriteView) {
    return Backbone.Router.extend({
      routes: {
        "": "index",
        "write": "write",
        "edit(/:id)": "write",
        "dashboard(/edit/:id)": "dashboard"
      },
      index: function() {},
      dashboard: function() {
        return new WriteView();
      },
      write: function() {
        return new WriteView();
      }
    });
  });

}).call(this);
