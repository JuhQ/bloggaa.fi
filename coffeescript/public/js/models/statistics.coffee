define [
  "jquery"
  "underscore"
  "backbone"
], (
  $
  _
  Backbone
  ) ->
  Backbone.Model.extend
    url: "/api/statistics"