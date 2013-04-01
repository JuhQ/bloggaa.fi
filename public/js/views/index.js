(function() {
  define(["jquery", "underscore", "backbone", "text!templates/index.html"], function($, _, Backbone, Template) {
    return Backbone.View.extend({
      el: "#container",
      initialize: function() {
        return this.$e.html(_.template(Template));
      }
    });
  });

}).call(this);
