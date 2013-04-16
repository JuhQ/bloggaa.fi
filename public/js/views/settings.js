(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".settings",
      events: {
        "click #tab a": "openTab"
      },
      openTab: function(event) {
        event.preventDefault();
        return $(event.currentTarget).tab('show');
      }
    });
  });

}).call(this);
