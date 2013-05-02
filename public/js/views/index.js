(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "focus form[action='/register'] input": "showRepatcha"
      },
      showRepatcha: function() {
        var element;

        element = $(".recaptcha");
        if (!element.is(":visible")) {
          return element.slideDown();
        }
      }
    });
  });

}).call(this);
