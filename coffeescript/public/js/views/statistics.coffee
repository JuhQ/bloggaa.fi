define [
  "jquery"
  "underscore"
  "backbone"
  "jsapi"
  "models/statistics"
  "text!templates/statistics.html"
  ], (
  $
  _
  Backbone
  Google
  Model
  Template
  ) ->
  Backbone.View.extend
    el: ".container"
    initialize: ->
      _.bindAll this, "drawChart"
      google.load('visualization', '1', {'callback': this.drawChart, 'packages': ['corechart']})

    drawChart: ->
      that = @
      model = new Model()
      model.fetch success: ->
        that.$el.html _.template Template, name: "jotain"

        rows = []
        $.each(model.get("rows"), (row, i) ->
          rows.push([row, i])
        )

        data = new google.visualization.DataTable()
        data.addColumn('string', 'Kuukausi')
        data.addColumn('number', 'Vierailut')
        data.addRows(rows)

        chart = new google.visualization.AreaChart(document.getElementById('statistics'))
        chart.draw data,
          title: 'Tilastot sivulle'
          hAxis: title: 'Päivät', titleTextStyle: color: 'red'
