mongoose = require('mongoose')
exports.config = () ->
  blogSchema = mongoose.Schema {
    name: 'String'
    url: 'String'
    added: 'Date'
    lastpost: 'Date'
  }
  blogPostSchema = mongoose.Schema {
    title: 'String'
    url: 'String'
    content: 'String'
    added: 'Date'
    hidden: 'Boolean'
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
  mongoose.model 'blogs', blogSchema
  mongoose.model 'blogposts', blogPostSchema
  mongoose.model 'users', userSchema
  mongoose.connect 'localhost', 'bloggaa'