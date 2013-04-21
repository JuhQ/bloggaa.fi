(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.Model.extend({
      url: "/statistics/%id/json",
      initialize: function(options) {
        this.url = this.url.replace("%id", options.id);
      }
    });
  });

}).call(this);
