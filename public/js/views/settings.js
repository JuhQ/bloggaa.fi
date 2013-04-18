(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".settings",
      events: {
        "click #tab a": "openTab"
      },
      initialize: function() {
        return require(["/js/libs/select2.js"], function(select2) {
          return $('select').select2();
        });
      },
      openTab: function(event) {
        event.preventDefault();
        return $(event.currentTarget).tab('show');
      }
    });
  });

}).call(this);
