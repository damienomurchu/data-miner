# data-miner #
[![Build Status](https://travis-ci.org/damienomurchu/data-miner.svg?branch=master)](https://travis-ci.org/damienomurchu/data-miner)
[![Coverage Status](https://coveralls.io/repos/damienomurchu/data-miner/badge.svg)](https://coveralls.io/r/damienomurchu/data-miner)
data-miner is a data analysis application written in node.js that is called and run from the commandline. data-miner 
accepts an input file, allows analysis to be performed on it, and produces an analysed output file and/ or graphed output.

### Installation requirements ###
data-miner requires node 6.x, and relies on the following packages:
* yargs: ^7.0.1

### Downloading data-miner ###
clone the data-miner repository by navigating to the location where you want to save data-miner, and running the command 
`git clone git@github.com:damienomurchu/data-miner.git`

### Running data-miner as a CLI ###
From a terminal, navigate to the folder where data-miner is located, and run data-miner with 
`node ./dataminer-cli.js` to outline how to use data-miner from the commandline, and the various flags/ options available. The output should be similar to the following:

![cli-screenshot](/public/images/cli-screenshot.png)

### Installing data-miner as an NPM module ###

Run `npm i -S kujira-data-miner` to install

Call in code via: 
* `const data-miner = require('kujira-data-miner');`
* `var burndownDataSet = data-miner.burndownReportData(jiraData, sprintName); // returns a graphable json dataset`

Available methods:
* `data-miner.burndownReportData(jiraData, sprintName);`
* `data-miner.velocity(jiraData);`
* `data-miner.createdResolved(jiraData, startDate, endDate);`
* `data-miner.averageAge(jiraData, startDate, endDate);`
* `data-miner.sprintReport(jiraData, sprintName);`