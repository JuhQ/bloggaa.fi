(function() {
  define(["backbone", "models/api"], function(Backbone, ApiModel) {
    return ApiModel.extend({
      urlRoot: "http://userpics.com/api/pictures",
      getPicture: function() {
        var that;

        that = this;
        this.singlePicture = true;
        this.urlRoot = this.urlRoot.replace("pictures", "picture");
      },
      nextPicture: function() {
        var Model, deferred, model, that;

        that = this;
        deferred = $.Deferred();
        Model = Backbone.Model.extend({
          urlRoot: this.url().replace("pictures", "nextpicture")
        });
        model = new Model();
        model.fetch({
          success: function() {
            that.set({
              next: model
            });
            return deferred.resolve();
          }
        });
        return deferred.promise();
      },
      prevPicture: function() {
        var Model, deferred, model, that;

        that = this;
        deferred = $.Deferred();
        Model = Backbone.Model.extend({
          urlRoot: this.url().replace("pictures", "prevpicture")
        });
        model = new Model();
        model.fetch({
          success: function() {
            that.set({
              prev: model
            });
            return deferred.resolve();
          }
        });
        return deferred.promise();
      }
    });
  });

}).call(this);
