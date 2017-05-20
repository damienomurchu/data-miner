---
---

# data-miner
[![Build Status](https://travis-ci.org/damienomurchu/data-miner.svg?branch=develop)](https://travis-ci.org/damienomurchu/data-miner)
[![Coverage Status](https://coveralls.io/repos/damienomurchu/data-miner/badge.svg?branch=develop)](https://coveralls.io/github/damienomurchu/data-miner?branch=develop)


## Overview

Data-miner is a data analysis module that accepts raw JIRA data extracted from JIRA with jira-miner and produces refined data sets. 
It was designed both as a component to handle data analysis needs of Kujira, and also as a standalone component in its own right. 


## Kujira

Kujira is a project to provide a GUI-based service to extract, analyse and graph data from JIRA. Data-miner was developed 
initially to handle the needs of Kujira to analyse JIRA data in JSON form, and produce sets of graphable data. 

An overview of the Kujira project can be seen below

[![KujiraScreenShot](https://s24.postimg.org/5x4ly9wc5/kujira_demo.jpg)](https://youtu.be/oGjQbwPOAoo)


## Functionality

From an input of raw JIRA data, data-miner will produce datasets in JSON format that can be then used to produce the following chart types:

* sprint burndown
* sprint velocity
* average age of issues
* created vs resolved issues

This functionality is available through a CLI, through code via an NPM package, or through RESTful API routes if using data-miner as a server/ service. 
An example of this functionality through its CLI can be seen below

[![DataMinerScreenShot](http://i66.tinypic.com/2hx2k35.jpg)](https://vimeo.com/218291119)

In addition to providing graphable data, data-miner provides a number of utility methods for JIRA issues

* `sprintInfo` returns all the sprint details in a raw JIRA file
* `issueData` returns the relevant info on tickets in a sprint
* `issuesInSprint` returns all issues in a sprint
* `resolvedDate` returns an issues resolved info
* `resolvedDates` returns resolved info & storypoints on multiple issues

The above functionality is available via the data-miner NPM package, or by using data-miner as a RESTful service via its API routes.


## Prerequisites

To use data-miner you should have the following

* Node 4.x installed
* npm installed


## Installing data-miner

There are a number of ways to utilise data-miner. Presently these comprise

* run via the CLI interface
* call from code as an npm module
* run as a server/ service with RESTful endpoints


### Installing as a CLI

To install as a CLI tool follow these steps

* clone the repo: `git clone https://github.com/damienomurchu/data-miner.git`
* run via `node ./dataminer-cli.js`

The CLI API is outlined [here](#cli-api-command-options). 


### Installing as an NPM module

* Global install: `npm i -g kujira-data-miner`
* Local install: `npm i -S kujira-data-miner`

Once installed, data-miner can be used within your code by importing it with  
 `const data-miner = require('kujira-data-miner')`

The npm CLI is outlined here [here](#npm-api-methods). 

Npm page for data-miner: [here](https://www.npmjs.com/package/kujira-data-miner). 


### Installing as a RESTful service

The functionality available within the data-miner CLI and NPM module is also available through a RESTful API. 

To install data-miner as a RESTful service follow these steps

* clone the repo: `git clone https://github.com/damienomurchu/data-miner.git`
* `cd data-miner`
* `node app.js`

Alternatively, a docker container image is also located [here](https://hub.docker.com/r/kujiraproject/kujira/
).

The RESTful API is outlined [here](#restful-api-routes). 


## API reference

### NPM API methods

Available methods comprise the following
* `data-miner.burndownReportData(jiraData, sprintName);`  
 // returns a json dataset to populate a burndown chart
* `data-miner.velocity(jiraData);`  
 // returns a json dataset to populate a velocity chart
* `data-miner.createdResolved(jiraData, startDate, endDate);`  
 // returns a json dataset to populate a created-vs-resolved chart
* `data-miner.averageAge(jiraData, startDate, endDate);`  
 // returns a json dataset to populate an average-age chart
* `data-miner.sprintReport(jiraData, sprintName);`  
 // returns a json dataset to populate a sprint-report
* `data-miner.sprintInfo(jiraData);`  
 // returns an array of all sprint details in a jira dump
* `data-miner.issueData(jiraData);`  
 // returns an array of all relevant info on each ticket in a sprint
* `data-miner.issuesInSprint(jiraData, sprintName);`  
 // returns an array of all issues in a sprint
* `data-miner.resolvedDate(jiraIssue);`  
 // returns the date an issue was resolved (if resolved)
* `data-miner.resolvedDates(jiraData);`  
 // returns an array with the storypoints and resolved dates of all issues


### CLI API command options

To view the command options available through the CLI, simply run

* `node dataminer-cli.js`


### RESTful API routes

All functionality available through the NPM API is available via RESTful API routes also when data-miner is run as a service. The routes available comprise

* `POST  /data/burndown`  
// Accepts a file of json JIRA data and sprint name  
// Parameters: jiradata, sprint  
// Returns a json dataset to feed a sprint burndown chart  

* `POST  /data/sprintReport`  
// Accepts a file of json JIRA data and sprint name  
// Parameters: jiradata, sprint  
// Returns a json dataset to feed a sprint report   

* `POST  /data/velocity`  
// Accepts a file of json JIRA data  
// Parameters: jiradata  
// Returns a json dataset to feed a sprint velocity chart  

* `POST  /data/averageAge`  
// Accepts a file of json JIRA data, start and end date  
// Parameters: jiradata, start, end  
// Returns a json dataset to feed a sprint average age chart  

* `POST  /data/createdResolved`  
// Accepts a file of json JIRA data, start and end date  
// Parameters: jiradata, start, end  
// Returns a json dataset to render a created vs resolved chart  

* `POST  /data/sprintInfo`  
// Accepts a file of json JIRA data and a sprint name  
// Parameters: jiradata, sprint  
// Returns all sprint details  

* `POST  /data/issueData`  
// Accepts a file of json JIRA data  
// Parameters: jiradata  
// Returns all relevant details on each ticket in a sprint  

* `POST  /data/issuesInSprint`  
// Accepts a file of json JIRA data and a sprint name  
// Parameters: jiradata, sprint  
// Returns an array of all issues in that sprint  

* `POST  /data/resolvedDate`  
// Accepts a jira issue ticket  
// Parameters: issue  
// Returns the date an issue was resolved (if resolved)  

* `POST  /data/resolvedDates`  
// Accepts a file of json JIRA data  
// Parameters: jiradata  
// Returns an array with the storypoints and resolved dates of all issues  
