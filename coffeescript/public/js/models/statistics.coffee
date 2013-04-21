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
    url: "/statistics/%id/json",
    initialize: (options) ->
      @url = @url.replace "%id", options.id
      return