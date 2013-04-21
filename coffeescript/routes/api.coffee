mongoose = require('mongoose')
moment = require('moment')

exports.statistics = (req, res) ->
  return res.jsonp fail: "multi" unless req.session.user

  Visits = mongoose.model "visits"
  Visits.find(
    user: req.session.user.id
  ).sort('-added').limit(1000).exec (err, data) ->
    result = {}
    data.forEach((row) ->
      date = moment(row.date).format("YYYY-MM-DD")
      result[date] = 0 unless result[date]
      result[date]++
      null
    )

    res.jsonp rows: result