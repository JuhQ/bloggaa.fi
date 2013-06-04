requirejs.config
  baseUrl: "/js"
  enforceDefine: true
  paths:
    jquery: ["http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min", "libs/jquery"]
    jsapi: "http://www.google.com/jsapi?callback=define",
    backbone: "libs/backbone"
    underscore: "libs/underscore"
    text: "libs/text"
    bootstrap: "libs/bootstrap"
    wysihtml5: "libs/wysihtml5"

define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  require [
    "routers/router"
    "libs/fastclick"
    "bootstrap"
    ], (Router, Fastclick, bootstrap) ->

    window.router = new Router()
    Backbone.history.start
      pushState: true
      replace: true

    new FastClick(document.body)