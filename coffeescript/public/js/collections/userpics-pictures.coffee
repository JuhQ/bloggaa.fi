define ["backbone", "models/picture"], (Backbone, Model) ->
  Backbone.Collection.extend
    #url: "/api"
    url: "http://userpics.com/api"
    model: Model
    initialize: (options) ->
      if options and options.service
        @url += "/" + options.service

    sync: (method, model, options) ->
      params = _.extend(
        type: "GET"
        dataType: "jsonp"
        url: model.url()
        processData: false
      , options)
      $.ajax params