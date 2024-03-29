mongoose = require('mongoose')
Recaptcha = require("recaptcha").Recaptcha

exports.index = (req, res) ->
  recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS")
  return res.redirect "/dashboard" if req.session.user
  domain = req.get('host').replace(req.subdomains[0] + ".", "")
  res.render "landingpage-index",
    title: "Bloggaa.fi"
    recaptcha_form: recaptcha.toHTML()

exports.saveAccountSettings = (req, res) ->
  res.send "Hello world"

exports.saveSettings = (req, res) ->
  return res.redirect "/" unless req.session.user

  urlBase = req.body.name
  urlBase = req.body.url if req.body.url

  url = urlBase.trim().toLowerCase().replace(/[äåÄÅ]/g, "a").replace(/[öÖ]/g, "o").replace(/[^a-z0-9]+/g,'-')

  Blog = mongoose.model 'blogs'
  Blog.findOne({
    url: url
  }).exec (err, data) ->
    return res.redirect "/" if data and String(req.session.user.id) isnt String(data.user)
    Blog.findOne({
      user: req.session.user.id
      _id: req.body.id
    }).exec (err, data) ->
      return res.redirect "/" unless data

      Blog.update { _id: data._id },
        $set:
          name: req.body.name
          url: url # NOTE! when url changes, all posts need to update as well
          disqus: req.body.disqus || ""
          commentsDisabled: Number(req.body.comments_disabled) is 1
          googleanalytics: req.body.googleanalytics || ""
          facebookComments: req.body.facebookComments || ""
          theme: req.body.theme || ""
          sidebar: req.body.sidebar || ""
          description: req.body.description || ""
          addthis: req.body.addthis || ""
          titlefont: req.body.titlefont || ""
          contentfont: req.body.contentfont || ""
      , () ->
        Blog.findOne({
          user: req.session.user.id
          _id: req.body.id
        }).exec (err, data) ->
          Blogposts = mongoose.model 'blogposts'
          Blogposts.update { blog: data._id, user: req.session.user.id },
            $set: subdomain: url
          , {multi: true}, () ->
            res.render "settings",
              title: "Asetukset tallennettu - Bloggaa.fi"
              session: req.session
              blog: data
