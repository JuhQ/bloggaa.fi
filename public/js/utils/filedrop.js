(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: "html",
      events: {
        "drop body": "drop"
      },
      initialize: function() {
        console.log("asdfd");
        this.fileReader = new FileReader();
      },
      drop: function(event) {
        var element, files, that;

        event.stopPropagation();
        event.preventDefault();
        that = this;
        element = $(".drop");
        files = null;
        if (_.isUndefined(FileReader)) {
          return;
        }
        if (event.originalEvent.target.files) {
          files = event.originalEvent.target.files;
        }
        if (event.dataTransfer && event.dataTransfer.files) {
          files = event.dataTransfer.files;
        }
        if (_.isNull(files)) {
          return;
        }
        return $.each(files, function(index, file) {
          that.fileReader.onload = (function(file) {
            if (!_.contains(['png', 'jpg', 'gif'], file.type.replace("image/", ""))) {
              return;
            }
            return function(e) {
              console.log("mikä on file", file);
              console.log("mikä on event", e);
              console.log("mikä on event.target", e.target);
              return $("#editor :file").val(e.target.result);
            };
          })(file);
          return that.fileReader.readAsDataURL(file);
        });
      }
    });
  });

}).call(this);
