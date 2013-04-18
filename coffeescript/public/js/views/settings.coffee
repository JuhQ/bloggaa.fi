define [
  "jquery"
  "underscore"
  "backbone"
  "../libs/select2"
  ], (
  $
  _
  Backbone
  select2
  ) ->
  Backbone.View.extend
    el: ".settings"
    events:
      "click #tab a": "openTab"
    initialize: ->
      console.log "asd"
      $('select').select2()

    openTab: (event) ->
      event.preventDefault()
      $(event.currentTarget).tab('show')
      