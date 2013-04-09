define [
  "views/write"
], (
  WriteView
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"

    index: ->
    write: ->
      new WriteView()
