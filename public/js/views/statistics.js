(function() {
  define(["jquery", "underscore", "backbone", "models/statistics", "text!templates/statistics.html"], function($, _, Backbone, Model, Template) {
    return Backbone.View.extend({
      el: "#container",
      initialize: function() {
        return google.load('visualization', '1', {
          'callback': this.drawChart,
          'packages': ['corechart']
        });
      },
      drawChart: function() {
        var model;

        model = new Model({
          id: this.id
        });
        return model.fetch({
          success: function() {
            var chart, data;

            that.$el.html(_.template(Template, {
              name: "jotain"
            }));
            data = new google.visualization.DataTable();
            data.addColumn('date', 'Variation');
            data.addColumn('number', item.testversion);
            chart = new google.visualization.AreaChart(document.getElementById('statistics'));
            return chart.draw(goalData, {
              title: 'title',
              hAxis: {
                title: 'Dates',
                titleTextStyle: {
                  color: 'red'
                }
              }
            });
          }
        });
      }
    });
  });

}).call(this);
