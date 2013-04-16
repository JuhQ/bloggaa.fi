(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.config = function() {
    var blogPostSchema, blogSchema, userSchema, visitSchema;

    blogSchema = mongoose.Schema({
      name: 'String',
      url: 'String',
      addthis: 'String',
      disqus: 'String',
      googleanalytics: 'String',
      facebookComments: 'String',
      sidebar: 'String',
      theme: 'String',
      titlefont: 'String',
      contentfont: 'String',
      description: 'String',
      user: 'ObjectId',
      added: 'Date',
      lastpost: 'Date'
    });
    blogPostSchema = mongoose.Schema({
      title: 'String',
      url: 'String',
      content: 'String',
      added: 'Date',
      edited: 'Date',
      hidden: 'Boolean',
      visits: 'Number',
      user: 'ObjectId',
      blog: 'ObjectId'
    });
    userSchema = mongoose.Schema({
      email: 'String',
      password: 'String',
      salt: 'String',
      added: 'Date',
      lastvisit: 'Date',
      lastpost: 'Date'
    });
    visitSchema = mongoose.Schema({
      blog: 'ObjectId',
      user: 'ObjectId',
      blogpost: 'ObjectId',
      date: 'Date',
      ip: 'String'
    });
    mongoose.model('visits', visitSchema);
    mongoose.model('blogs', blogSchema);
    mongoose.model('blogposts', blogPostSchema);
    mongoose.model('users', userSchema);
    return mongoose.connect('localhost', 'bloggaa');
  };

}).call(this);
