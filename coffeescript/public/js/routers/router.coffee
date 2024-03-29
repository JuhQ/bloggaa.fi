define [
  "views/index"
  "views/write"
  "views/settings"
  "views/statistics"
], (
  IndexView
  WriteView
  SettingsView
  StatisticsView
  ) ->
  Backbone.Router.extend
    routes:
      "": "index"
      "write": "write"
      "edit(/:id)": "write"
      "dashboard(/edit/:id)": "dashboard"
      "dashboard/settings": "settings"
      "dashboard/visits": "visits"

    index: ->
      new IndexView()

    settings: ->
      new SettingsView()

    dashboard: ->
      # for editor control
      new WriteView()

    visits: ->
      new StatisticsView()

    write: ->
      new WriteView()
