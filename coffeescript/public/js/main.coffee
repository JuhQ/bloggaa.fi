requirejs.config
  baseUrl: "/js"
  enforceDefine: true
  paths:
    jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min"
    backbone: "libs/backbone"
    underscore: "libs/underscore"
    text: "libs/text"

define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  require [
    "routers/router"
    "libs/fastclick"
    ], (Router, Fastclick) ->

    window.router = new Router()
    Backbone.history.start
      pushState: true
      replace: true

    window.addEventListener "load", ->
      new FastClick(document.body)
    , false