'use strict';

// small proof of concept around generating graphs from the data-miner cli through gnuplot

var gnuplot = require('gnu-plot');
var api = require('./../npm-service-methods');
var testData = require('./../test/utils/test-jira-data.json');
var fixtures = require('./../test/utils/test-fixtures.json');

'use strict';

var plot = gnuplot();

plot
    .set(
      {
        xrange: '[0:10]',
        yrange: '[0:10]',
      }
    )
    .plot([
      {
        title: 'expected',
        style: 'lines',
        data: [[1, 1], [2, 2], [3, 3]],
      },
      {
        title: 'actual',
        style: 'lines',
        data: [[1, 4], [2, 5], [3, 4]],
      },
]);
