(function() {
  requirejs.config({
    baseUrl: "/js",
    enforceDefine: true,
    paths: {
      jquery: "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      backbone: "libs/backbone",
      underscore: "libs/underscore",
      text: "libs/text",
      bootstrap: "libs/bootstrap",
      wysihtml5: "libs/wysihtml5"
    }
  });

  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return require(["routers/router", "libs/fastclick", "bootstrap"], function(Router, Fastclick, bootstrap) {
      window.router = new Router();
      Backbone.history.start({
        pushState: true,
        replace: true
      });
      return window.addEventListener("load", function() {
        return new FastClick(document.body);
      }, false);
    });
  });

}).call(this);
