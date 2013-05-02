(function() {
  define(["backbone", "models/picture"], function(Backbone, Model) {
    return Backbone.Collection.extend({
      url: "http://userpics.com/api",
      model: Model,
      initialize: function(options) {
        if (options && options.service) {
          return this.url += "/" + options.service;
        }
      },
      sync: function(method, model, options) {
        var params;

        params = _.extend({
          type: "GET",
          dataType: "jsonp",
          url: model.url(),
          processData: false
        }, options);
        return $.ajax(params);
      }
    });
  });

}).call(this);
