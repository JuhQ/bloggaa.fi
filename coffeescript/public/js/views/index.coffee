define [
  "jquery"
  "underscore"
  "backbone"
  ], (
  $
  _
  Backbone
  ) ->
  Backbone.View.extend
    el: ".container"
    events:
      "focus form[action='/register'] input": "showRepatcha"

    showRepatcha: ->
      element = $(".recaptcha")
      element.slideDown() unless element.is(":visible")
    