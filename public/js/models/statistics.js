(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.Model.extend({
      url: "/api/statistics"
    });
  });

}).call(this);
