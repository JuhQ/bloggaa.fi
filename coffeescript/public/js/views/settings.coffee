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

    openTab: (event) ->
      event.preventDefault()
      $(event.currentTarget).tab('show')