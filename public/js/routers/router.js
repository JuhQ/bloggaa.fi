(function() {
  define(["views/write", "views/settings"], function(WriteView, SettingsView) {
    return Backbone.Router.extend({
      routes: {
        "": "index",
        "write": "write",
        "edit(/:id)": "write",
        "dashboard(/edit/:id)": "dashboard",
        "dashboard/settings": "settings"
      },
      index: function() {},
      settings: function() {
        return new SettingsView();
      },
      dashboard: function() {
        return new WriteView();
      },
      write: function() {
        return new WriteView();
      }
    });
  });

}).call(this);
