define [
  "views/like"
], (
  LikeView
  ) ->
  Backbone.Router.extend
    routes:
      "(/:blog)": "index"
    index: (blog) ->
      new LikeView blog: blog