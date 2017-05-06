'use strict';

// small proof of concept around generating graphs from the data-miner cli through gnuplot

var gnuplot = require('gnuplot');
var api = require('./npm-service-methods');
var testData = require('./test/utils/test-jira-data.json');
var fixtures = require('./test/utils/test-fixtures.json');

'use strict';

/*gnuplot()
    .set('term png')
    .set('output "out.png"')
    .set('title "Burndown Chart, Sprint X"')
    .set('xrange [0:20]')
    .set('yrange [0:10]')
    .set('zeroaxis')
    .plot('(x/4)**2, sin(x), 1/x')
    .end();*/

var bd = api.burndownReportData(testData, fixtures.sprintName);
console.log(bd.actualBurndown);
console.log(bd.expectedBurndown);

var xmax = bd.actualBurndown.length;
var ymax = bd.actualBurndown[0].points;
var actual = bd.actualBurndown;

var x = [[1, 1], [2, 2], [3, 3]];
var y = [[1, 4], [2, 5], [3, 4]];

/*// outputting from a file
gnuplot()
    .set('term png large')
    .set('output "out.png"')
    .set('title "Burndown Chart, Sprint X"')
    .set(`xrange [0:${xmax}]`)
    .set(`yrange [0:60]`)
    .set('zeroaxis')
    .plot('"sample.dat" using 1:2 with lines, "sample.dat" using 1:3 with lines')
    .end();*/

// outputting without a file
gnuplot()
    .set('term png large')
    .set('output "out.png"')
    .set('title "Burndown Chart, Sprint X"')
    .set(`xrange [0:6`)
    .set(`yrange [0:70]`)
    .set('zeroaxis')
    .plot(
        '"-" using 1:2 title "My Plot" with lp \ ' +
        '1 30 ' +
        '2 40 ' +
        '3 35 ' +
        '4 60 ' +
        '5 50 ' +
        'EOF'
    )
    .end();



