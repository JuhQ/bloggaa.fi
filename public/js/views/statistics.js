(function() {
  define(["jquery", "underscore", "backbone", "jsapi", "models/statistics", "text!templates/statistics.html"], function($, _, Backbone, Google, Model, Template) {
    return Backbone.View.extend({
      el: ".container",
      initialize: function() {
        _.bindAll(this, "drawChart");
        return google.load('visualization', '1', {
          'callback': this.drawChart,
          'packages': ['corechart']
        });
      },
      drawChart: function() {
        var model, that;

        that = this;
        model = new Model();
        return model.fetch({
          success: function() {
            var chart, data, rows;

            that.$el.html(_.template(Template, {
              name: "jotain"
            }));
            rows = [];
            $.each(model.get("rows"), function(row, i) {
              return rows.push([row, i]);
            });
            data = new google.visualization.DataTable();
            data.addColumn('string', 'Kuukausi');
            data.addColumn('number', 'Vierailut');
            data.addRows(rows);
            chart = new google.visualization.AreaChart(document.getElementById('statistics'));
            return chart.draw(data, {
              title: 'Tilastot sivulle',
              hAxis: {
                title: 'Päivät',
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
