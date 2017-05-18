#!/usr/bin/env node

'use strict'

const yargs = require('yargs');
const api = require('./npm-service-methods');
var fs = require('fs');

// checks if sprint name is a valid argument
function validName(sprintname) {
  if (!sprintname)
    return false;
  return true;
}

// checks if date string is a valid argument
function validDate(date) {

  // check if date is falsey
  if (!date)
    return false;

  // check format & return true if date string matches YYYY-MM-DD format
  var regex = /^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/g;
  var str = date.substring(0, 10);
  return regex.test(str);
}

// define CLI input options
const cli = function () {
  var argv = yargs
      .usage('Usage: node $0 -f <file> [<flag> <option>]...')
      .option('f', {
        alias: 'file',
        describe: 'specify an input file',
        type: 'string',
      })
      .option('g', {
        alias: 'graph',
        choices: ['burndown', 'velocity', 'averageage', 'createdresolved'],
        describe: 'specify the graph needed',
        type: 'string',
      })
      .option('o', {
        alias: 'output',
        default: 'console',
        choices: ['console', 'file'],
        describe: 'specify format of output raincatchDump.json',
        type: 'string',
      })
      .option('n', {
        alias: 'name',
        describe: 'specify sprint name',
        type: 'string',
      })
      .option('s', {
        alias: 'start',
        describe: 'specify start date of period',
        type: 'string',
      })
      .option('e', {
        alias: 'end',
        describe: 'specify end date of period',
        type: 'string',
      })
      .demandOption(['file'], 'Please provide input file.')
      .example('$0 -f raincatchDump.json.csv -g g-1 -o json -s 01/01/2016 -e 31/12/2016', 'Read in raincatchDump.json from the file raincatchDump.json.csv, and produce json output raincatchDump.json for the graph type g-1, for the date range 01/01/2016 to 31/12/2016')
      .help()
      .argv;

  // check graph type required & render back to user
  switch (argv.graph) {
    case 'burndown':
      console.log(argv.graph);
      console.log(argv.name);
      if (!argv.file || !validName(argv.name)) {
        console.log('Invalid filename: <' + argv.file + '> or invalid sprint name: <' + argv.name + '>');
        break;
      }
      
      // read file & convert to json
      var jiraJson;
      try {
        jiraJson = JSON.parse(fs.readFileSync(argv.file).toString());
      } catch (err) {
        console.log(err.message);
        break;
      }

      // generate burndown chart data
      var burndownData = api.burndownReportData(jiraJson, argv.name);

      // write to file if 'file' chosen as output
      if (argv.output === 'file') {
        var filename = argv.name + '-' + argv.graph + '.json';
        fs.writeFile(filename, JSON.stringify(burndownData), function (err) {
          if (err) return console.error(err);
        });

        console.log('data written successfully to ' + filename);
        break;
      }

      // otherwise output to console
      console.log(burndownData);
      break;
    case 'velocity':
      if (!argv.file) {
        console.log('invalid filename: <' + argv.file + '>');
        break;
      }

      // read file & convert to json
      var jiraJson;
      try {
        jiraJson = JSON.parse(fs.readFileSync(argv.file).toString());
      } catch (err) {
        console.log(err.message);
        break;
      }

      // generate velocity chart data
      var velocityData = api.velocity(jiraJson);

      // write to file if 'file' chosen as output
      if (argv.output === 'file') {
        var filename = argv.graph + '.json';
        fs.writeFile(filename, JSON.stringify(velocityData), function (err) {
          if (err) return console.error(err);
        });

        console.log('data written successfully to ' + filename);
        break;
      }

      // otherwise output to console
      console.log(velocityData);
      break;
    case 'averageage':
      if (!argv.file || !validDate(argv.start) || !validDate(argv.end)) {
        console.log('Invalid filename: <' + argv.file + '> or invalid dates: <' + argv.start + '> + <' + argv.end + '>');
        break;
      }

      // read file & convert to json
      var jiraJson;
      try {
        jiraJson = JSON.parse(fs.readFileSync(argv.file).toString());
      } catch (err) {
        console.log(err.message);
        break;
      }

      // generate velocity chart data
      var averageAgeData = api.averageAge(jiraJson, argv.start, argv.end);

      // write to file if 'file' chosen as output
      if (argv.output === 'file') {
        var filename = argv.graph + '-' + argv.start + '-' + argv.end + '.json';
        fs.writeFile(filename, JSON.stringify(averageAgeData), function (err) {
          if (err) return console.error(err);
        });

        console.log('data written successfully to ' + filename);
        break;
      }

      // otherwise output to console
      console.log(averageAgeData);
      break;
    case 'createdresolved':
      if (!argv.file || !validDate(argv.start) || !validDate(argv.end)) {
        console.log('Invalid filename: <' + argv.file + '> or invalid dates: <' + argv.start + '> + <' + argv.end + '>');
        break;
      }

      // read file & convert to json
      var jiraJson;
      try {
        jiraJson = JSON.parse(fs.readFileSync(argv.file).toString());
      } catch (err) {
        console.log(err.message);
        break;
      }

      // generate velocity chart data
      var createdResolvedData = api.createdResolved(jiraJson, argv.start, argv.end);

      // write to file if 'file' chosen as output
      if (argv.output === 'file') {
        var filename = argv.graph + '-' + argv.start + '-' + argv.end + '.json';
        fs.writeFile(filename, JSON.stringify(createdResolvedData), function (err) {
          if (err) return console.error(err);
        });

        console.log('data written successfully to ' + filename);
        break;
      }

      // otherwise output to console
      console.log(createdResolvedData);
      break;

    default:
      console.log('no option');
  }
};

cli();
