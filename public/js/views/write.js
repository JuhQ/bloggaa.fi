(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "keyup input[name='title']": "urlname"
      },
      initialize: function() {},
      urlname: function(event) {
        var element, url;

        element = $(event.currentTarget);
        url = element.val().trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g, '-');
        if (url === "") {
          return this.$(".url-container").addClass("hidden");
        }
        this.$(".url-container").removeClass("hidden");
        return this.$(".url").html(url);
      }
    });
  });

}).call(this);
