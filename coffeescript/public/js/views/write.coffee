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
      require(["wysihtml5"], (wysihtml5) ->
        new wysihtml5.Editor("textarea", {
          toolbar: "toolbar"
          parserRules: wysihtml5ParserRules
        })
      )

    urlname: (event) ->
      element = $(event.currentTarget)
      url = element.val().trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')
      return @$(".url-container").addClass("hidden") if url is ""
      @$(".url-container").removeClass("hidden")
      @$(".url").html url