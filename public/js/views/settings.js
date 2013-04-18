(function() {
  define(["jquery", "underscore", "backbone", "../libs/select2"], function($, _, Backbone, select2) {
    return Backbone.View.extend({
      el: ".settings",
      events: {
        "click #tab a": "openTab"
      },
      initialize: function() {
        console.log("asd");
        return $('select').select2();
      },
      openTab: function(event) {
        event.preventDefault();
        return $(event.currentTarget).tab('show');
      }
    });
  });

}).call(this);
