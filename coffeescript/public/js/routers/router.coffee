define [
  "views/write"
], (
  WriteView
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"
      "edit": "write"
      "edit/:id": "write"

    index: ->
    write: ->
      new WriteView()
