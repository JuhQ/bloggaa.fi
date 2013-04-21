(function() {
  var moment, mongoose;

  mongoose = require('mongoose');

  moment = require('moment');

  exports.statistics = function(req, res) {
    var Visits;

    if (!req.session.user) {
      return res.jsonp({
        fail: "multi"
      });
    }
    Visits = mongoose.model("visits");
    return Visits.find({
      user: req.session.user.id
    }).sort('-added').limit(1000).exec(function(err, data) {
      var result;

      result = {};
      data.forEach(function(row) {
        var date;

        date = moment(row.date).format("YYYY-MM-DD");
        if (!result[date]) {
          result[date] = 0;
        }
        result[date]++;
        return null;
      });
      return res.jsonp({
        rows: result
      });
    });
  };

}).call(this);
