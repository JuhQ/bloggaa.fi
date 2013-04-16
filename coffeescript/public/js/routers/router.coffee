define [
  "views/write"
  "views/settings"
], (
  WriteView
  SettingsView
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"
      "edit(/:id)": "write"
      "dashboard(/edit/:id)": "dashboard"
      "dashboard/settings": "settings"

    index: ->
    settings: ->
      new SettingsView()

    dashboard: ->
      # for editor control
      new WriteView()

    write: ->
      new WriteView()
