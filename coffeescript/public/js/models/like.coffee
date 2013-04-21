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

    sync: (method, model, options) ->
      console.log "model model", model, options
      params = _.extend({
        type: 'GET'
        dataType: 'jsonp'
        url: model.url
        processData: false
      }, options)

      return $.ajax(params)