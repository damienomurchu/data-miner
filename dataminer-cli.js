#!/usr/bin/env node

'use strict'

const yargs = require('yargs');

const cli = function() {
  var argv = yargs
      .usage('Usage: node $0 -f <file> [<flag> <option>]...')
      .option('f', {
        alias: 'file',
        default: '~/.jira-miner.db',
        describe: 'specify an input file',
        type: 'string'
      })
      .option('g', {
        alias: 'graph',
        choices: ['g-1', 'g-2', 'g-3'],
        describe: 'specify the graph needed',
        type: 'string'
      })
      .option('o', {
        alias: 'output',
        default: 'json',
        choices: ['csv', 'tsv', 'json'],
        describe: 'specify format of output data',
        type: 'string'
      })
      .option('s', {
        alias: 'start',
        describe: 'specify start date of period',
        type: 'string'
      })
      .option('e', {
        alias: 'end',
        describe: 'specify end date of period',
        type: 'string'
      })
      .demandOption(['file'], 'Please provide input file.')
      .example('$0 -f data.csv -g g-1 -o json -s 01/01/2016 -e 31/12/2016', 'Read in data from the file data.csv, and produce json output data for the graph type g-1, for the date range 01/01/2016 to 31/12/2016')
      .demandCommand()
      .help()
      .argv;
}

cli();