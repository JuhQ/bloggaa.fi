(function() {
  define(["jquery", "underscore", "backbone", "models/like"], function($, _, Backbone, Like) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "click .like": "like",
        "click .reblog": "reblog"
      },
      initialize: function() {
        return console.log(this.options);
      },
      like: function(event) {
        var element, model;

        event.preventDefault();
        element = $(event.currentTarget);
        model = new Like();
        model.url = element.attr("href");
        return model.fetch({
          success: function() {
            if (model.get("ok") === 1) {
              return element.removeClass("icon-heart-empty").addClass("icon-heart");
            } else {
              return element.addClass("icon-heart-empty").removeClass("icon-heart");
            }
          }
        });
      },
      reblog: function(event) {
        var url;

        event.preventDefault();
        url = $(event.currentTarget).attr("href");
      }
    });
  });

}).call(this);
