define [
], (
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"

    index: ->
    write: ->
      console.log "writer"
