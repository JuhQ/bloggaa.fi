(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: ".container",
      events: {
        "keyup input[name='title']": "urlname",
        "change input[name='image_url']": "toggleImage",
        "change #editor :file": "startUpload"
      },
      initialize: function() {
        var that;

        _.bindAll(this, "upload");
        that = this;
        this.upload();
        $.event.props.push("dataTransfer");
        $("body").bind("dragenter dragover", false);
        $(".image-preview").hide();
        return require(["wysihtml5", "/js/libs/select2.js", "utils/filedrop"], function(wysihtml5, select2, Filedrop) {
          $("input[name='tags']").select2({
            tags: [],
            tokenSeparators: [","]
          });
          that.wysihtml5 = new wysihtml5.Editor("textarea", {
            toolbar: "toolbar",
            parserRules: wysihtml5ParserRules
          });
          new Filedrop();
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
      },
      toggleImage: function(event) {
        var element;

        console.log("event", event);
        element = $(event.currentTarget);
        console.log("element", element);
        return $(".image-preview").html('<img src="' + element.val() + '" />').show();
      },
      startUpload: function(event) {
        var element;

        element = $(event.currentTarget);
        return $("form#image").append(element.clone()).submit();
      },
      upload: function() {
        var createIframe, that;

        that = this;
        createIframe = function(element) {
          var iframe;

          iframe = $('<iframe name="progressFrame" style="width:0;height:0;position:absolute;top:-999px"></iframe>');
          $(document.body).append(iframe);
          return element.attr("target", "progressFrame");
        };
        $.fn.extend({
          ajaxUpload: function() {
            console.log("plugge");
            return this.each(function() {
              var self;

              self = $(this);
              createIframe(self);
              return $(document).on("upload:complete", function(event, data) {
                that.wysihtml5.composer.element.focus();
                that.wysihtml5.composer.commands.exec("insertImage", "http://cdn.userpics.com/original/o91vf.jpg");
                return console.log("upload data", data);
              });
            });
          }
        });
        return $('form#image').ajaxUpload();
      }
    });
  });

}).call(this);
