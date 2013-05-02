define [
    "backbone"
    "models/api"
], (
  Backbone
  ApiModel
  ) ->
  ApiModel.extend
    urlRoot: "http://userpics.com/api/pictures"
    getPicture: () ->
      that = @
      @singlePicture = true
      @urlRoot = @urlRoot.replace "pictures", "picture"
      return

    nextPicture: () ->
      that = @
      deferred = $.Deferred()
      Model = Backbone.Model.extend urlRoot: @url().replace "pictures", "nextpicture"
      model = new Model()
      model.fetch success: ->
        that.set next: model
        deferred.resolve()
      deferred.promise()
      
    prevPicture: () ->
      that = @
      deferred = $.Deferred()
      Model = Backbone.Model.extend urlRoot: @url().replace "pictures", "prevpicture"
      model = new Model()
      model.fetch success: ->
        that.set prev: model
        deferred.resolve()
      deferred.promise()