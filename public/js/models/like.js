(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.Model.extend({
      sync: function(method, model, options) {
        var params;

        console.log("model model", model, options);
        params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          url: model.url,
          processData: false
        }, options);
        return $.ajax(params);
      }
    });
  });

}).call(this);
