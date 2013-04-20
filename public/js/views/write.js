(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "keyup input[name='title']": "urlname"
      },
      initialize: function() {
        return require(["wysihtml5", "/js/libs/select2.js"], function(wysihtml5, select2) {
          $("input[name='tags']").select2({
            tags: [],
            tokenSeparators: [","]
          });
          return new wysihtml5.Editor("textarea", {
            toolbar: "toolbar",
            parserRules: wysihtml5ParserRules
          });
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
