mongoose = require('mongoose')
exports.config = () ->
  blogSchema = mongoose.Schema {
    name: 'String'
    url: 'String'
    addthis: 'String'
    disqus: 'String'
    googleanalytics: 'String'
    facebookComments: 'String'
    sidebar: 'String'
    theme: 'String'
    titlefont: 'String'
    contentfont: 'String'
    description: 'String'
    user: 'ObjectId'
    visits: 'Number'
    added: 'Date'
    lastpost: 'Date'
  }
  blogPostSchema = mongoose.Schema {
    title: 'String'
    url: 'String'
    content: 'String'
    subdomain: 'String'
    tags: 'String' # Array does not work for some reason
    added: 'Date'
    edited: 'Date'
    hidden: 'Boolean'
    draft: 'Boolean'
    visits: 'Number'
    user: 'ObjectId'
    blog: 'ObjectId'
  }
  userSchema = mongoose.Schema {
    email: 'String'
    password: 'String'
    salt: 'String'
    added: 'Date'
    lastvisit: 'Date'
    lastpost: 'Date'
  }
  visitSchema = mongoose.Schema {
    blog: 'ObjectId'
    user: 'ObjectId'
    blogpost: 'ObjectId'
    date: 'Date'
    ip: 'String'
  }
  likeSchema = mongoose.Schema {
    blog: 'ObjectId'
    user: 'ObjectId'
    blogpost: 'ObjectId'
    date: 'Date'
  }
  imageSchema = mongoose.Schema {
    title: 'String'
    added: 'Date'
    user: 'ObjectId'
  }
  mongoose.model 'images', imageSchema
  mongoose.model 'visits', visitSchema
  mongoose.model 'blogs', blogSchema
  mongoose.model 'blogposts', blogPostSchema
  mongoose.model 'users', userSchema
  mongoose.model 'likes', likeSchema
  mongoose.connect 'localhost', 'bloggaa'