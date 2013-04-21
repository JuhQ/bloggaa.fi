define [
  "jquery"
  "underscore"
  "backbone"
  "models/like"
  ], (
  $
  _
  Backbone
  Like
  ) ->
  Backbone.View.extend
    el: ".container"
    events:
      "click .like": "like"
      "click .reblog": "reblog"
    initialize: () ->
      console.log @options
    like: (event) ->
      event.preventDefault()
      element = $(event.currentTarget)
      
      model = new Like()
      model.url = element.attr "href"
      model.fetch success: ->
        if model.get("ok") is 1
          element.removeClass("icon-heart-empty").addClass("icon-heart")
        else
          element.addClass("icon-heart-empty").removeClass("icon-heart")
        
    reblog: (event) ->
      event.preventDefault()
      url = $(event.currentTarget).attr "href"
      return