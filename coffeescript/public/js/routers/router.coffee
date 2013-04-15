define [
  "views/write"
], (
  WriteView
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"
      "edit(/:id)": "write"
      "dashboard(/edit/:id)": "dashboard"

    index: ->
    dashboard: ->
      # for editor control
      new WriteView()
    write: ->
      new WriteView()
