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
    el: ".container"
    events:
      "keyup input[name='title']": "urlname"
      "change input[name='image_url']": "toggleImage"
      "change #editor :file": "startUpload"

    initialize: ->
      _.bindAll this, "upload"
      that = @
      @upload()
      
      # jQuery creates it's own event object, and it doesn't have a
      # dataTransfer property yet. This adds dataTransfer to the event object.
      $.event.props.push "dataTransfer"
      $("body").bind "dragenter dragover", false

      $(".image-preview").hide()
      require(["wysihtml5","/js/libs/select2.js", "utils/filedrop"], (wysihtml5,select2,Filedrop) ->

        $("input[name='tags']").select2(
          tags:[]
          tokenSeparators: [","]
        )

        that.wysihtml5 = new wysihtml5.Editor("textarea", {
          toolbar: "toolbar"
          parserRules: wysihtml5ParserRules
        })

        new Filedrop()

        return
      )

    urlname: (event) ->
      element = $(event.currentTarget)
      url = element.val().trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')
      return @$(".url-container").addClass("hidden") if url is ""
      @$(".url-container").removeClass("hidden")
      @$(".url").html url

    toggleImage: (event) ->
      console.log("event", event)
      element = $(event.currentTarget)
      console.log "element", element
      $(".image-preview").html('<img src="' + element.val() + '" />').show()

    startUpload: (event) ->
      element = $(event.currentTarget)
      $("form#image").append(element.clone()).submit()

    upload: ->
      that = @
        
      # Private functions
      createIframe = (element) ->
        iframe = $('<iframe name="progressFrame" style="width:0;height:0;position:absolute;top:-999px"></iframe>')
        $(document.body).append iframe
        element.attr "target", "progressFrame"

      $.fn.extend ajaxUpload: ->
        console.log "plugge"
        @each ->
          self = $(this)
          createIframe self


          $(document).on "upload:complete", (event, data) ->
            that.wysihtml5.composer.element.focus()
            that.wysihtml5.composer.commands.exec "insertImage", "http://cdn.userpics.com/original/o91vf.jpg"

            console.log "upload data", data

      $('form#image').ajaxUpload()

