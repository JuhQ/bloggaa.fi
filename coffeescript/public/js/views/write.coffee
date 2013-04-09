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
      "keyup input[name='title']": "urlname"

    initialize: ->
    

    urlname: (event) ->
      element = $(event.currentTarget)
      @$(".url-container").removeClass("hidden")
      @$(".url").html element.val().trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')