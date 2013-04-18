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
    el: ".settings"
    events:
      "click #tab a": "openTab"
    initialize: ->
      require(["/js/libs/select2.js"], (select2) ->
        $('select').select2()
      )

    openTab: (event) ->
      event.preventDefault()
      $(event.currentTarget).tab('show')
      