define [
  "jquery"
  "underscore"
  "backbone"
  "wysihtml5"
  ], (
  $
  _
  Backbone
  wysihtml5
  ) ->
  Backbone.View.extend
    el: ".container"
    events:
      "keyup input[name='title']": "urlname"

    initialize: ->
      editor = new wysihtml5.Editor("textarea", {
        toolbar: "toolbar"
        parserRules: wysihtml5ParserRules
      })
      return
    
    urlname: (event) ->
      element = $(event.currentTarget)
      url = element.val().trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')
      return @$(".url-container").addClass("hidden") if url is ""
      @$(".url-container").removeClass("hidden")
      @$(".url").html url