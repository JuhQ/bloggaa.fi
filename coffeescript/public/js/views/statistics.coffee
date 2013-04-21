define [
  "jquery"
  "underscore"
  "backbone"
  "models/statistics"
  "text!templates/statistics.html"
  ], (
  $
  _
  Backbone
  Model
  Template
  ) ->
  Backbone.View.extend
    el: "#container"
    initialize: ->
      google.load('visualization', '1', {'callback': this.drawChart, 'packages': ['corechart']})

    drawChart: ->
      model = new Model id: this.id
      model.fetch success: ->
        that.$el.html _.template Template, name: "jotain"

        data = new google.visualization.DataTable()
        data.addColumn 'date', 'Variation'
        data.addColumn 'number', item.testversion

        chart = new google.visualization.AreaChart(document.getElementById('statistics'))
        chart.draw goalData,
          title: 'title'
          hAxis: title: 'Dates', titleTextStyle: color: 'red'
