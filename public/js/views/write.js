(function() {
  define(["jquery", "underscore", "backbone", "wysihtml5"], function($, _, Backbone, wysihtml5) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "keyup input[name='title']": "urlname"
      },
      initialize: function() {
        var editor;

        editor = new wysihtml5.Editor("textarea", {
          toolbar: "toolbar",
          parserRules: wysihtml5ParserRules
        });
      },
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
