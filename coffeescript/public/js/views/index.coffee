define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/index.html"
  ], (
  $
  _
  Backbone
  Template
  ) ->
  Backbone.View.extend
    el: "#container"
    initialize: ->
      @$e.html _.template Template