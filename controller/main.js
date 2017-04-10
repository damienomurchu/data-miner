'use strict'

const express = require('express');
const router = express.Router();
const sampleData = require("../sample-data/rc2.json");
const multer = require('multer');
const upload = multer();


function readFile(filename) {
  return JSON.parse(filename);
}

// Analyse the received raincatchDump.json & return a json dataset to feed a sprint burndown chart
router.post('/burndown', function (req, res) {
  //TODO process received file & return a json dataset to populate a burndown chart
  //res.send('You have just hit the route: /graph/burndown');
  let data = require("../sample-data/rc2.json");
  let sprintTickets = data.map(function(obj) {
    
  });
  
  res.json(sampleData);
});