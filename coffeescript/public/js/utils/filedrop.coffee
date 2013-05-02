define [
  "jquery"
  "underscore"
  "backbone"
  ], (
  $
  _
  Backbone
  ) ->
  Backbone.View.extend
    el: "html"
    events:
      #"change input[type='file']": "drop"
      "drop body": "drop"

    initialize: () ->
      console.log "asdfd"
      @fileReader = new FileReader()
      return

    drop: (event) ->
      event.stopPropagation()
      event.preventDefault()

      that = this
      element = $(".drop")
      files = null
      
      return if _.isUndefined(FileReader)

      files = event.originalEvent.target.files if event.originalEvent.target.files
      files = event.dataTransfer.files if event.dataTransfer and event.dataTransfer.files
      
      return if _.isNull(files)
      
      # FIXME: for now, only the last image is uploaded to the server
      $.each files, (index, file) ->
        that.fileReader.onload = ((file) ->
          return unless _.contains(['png','jpg','gif'], file.type.replace("image/",""))
          (e) ->
            console.log "mikä on file", file
            console.log "mikä on event", e
            console.log "mikä on event.target", e.target
            $("#editor :file").val e.target.result
        )(file)
        that.fileReader.readAsDataURL file
