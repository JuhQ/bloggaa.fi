(function() {
  define(["views/write", "views/settings", "views/statistics"], function(WriteView, SettingsView, StatisticsView) {
    return Backbone.Router.extend({
      routes: {
        "": "index",
        "write": "write",
        "edit(/:id)": "write",
        "dashboard(/edit/:id)": "dashboard",
        "dashboard/settings": "settings",
        "dashboard/visits": "visits"
      },
      index: function() {},
      settings: function() {
        return new SettingsView();
      },
      dashboard: function() {
        return new WriteView();
      },
      visits: function() {
        return new StatisticsView();
      },
      write: function() {
        return new WriteView();
      }
    });
  });

}).call(this);
