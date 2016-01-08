///<reference path='../typings/tsd.d.ts' />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

//import routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));

//app.use(/\//, routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

import fs = require('fs');
import util = require('util');
import Immmutable = require('immutable');
import _ = require('lodash');

const CLASS_DATA = Immutable.Map({
  '2DShapes': '2DShapes',
  'AccessControl': 'Access Control',
  'AccessControl2': 'Access Control 2',
  'Accidents': 'Accidents',
  'Accommodations': 'Accommodations',
  'AfghanRainDesign': 'Afghan Rain Design',
  'AirlineExample': 'Airline',
  'BankingSystemA': 'Banking System A',
  'BankingSystemB': 'Banking System B',
  'CanalSystem': 'Canal',
  'Decisions': 'Decisions',
  'OhHellWhist': 'Card Games',
  'Claim': 'Claim (Insurance)',
  'CommunityAssociation': 'Community Association',
  'Compositions': 'Compositions',
  'CoOpSystem': 'Co-Op System',
  'DMMOverview': 'DMM Overview',
  'GeometricSystem': 'Geometric system',
  //'DMMModelElementHierarchy': 'DMM Model Element Hierarchy',
  'DMMSourceObjectHierarchy': 'DMM Source Object Hierarchy',
  'DMMRelationshipHierarchy': 'DMM Relationship Hierarchy',
  'DMMExtensionCTF': 'DMM CTF',
  'ElectionSystem': 'Election System',
  'ElevatorSystemA': 'Elevator System A',
  'ElevatorSystemB': 'Elevator System B',
  'GenealogyA': 'Genealogy A',
  'GenealogyB': 'Genealogy B',
  'GenealogyC': 'Genealogy C',
  'GeographicalInformationSystem': 'Geographical Information System',
  'Hospital': 'Hospital',
  'Hotel': 'Hotel',
  'Insurance': 'Insurance',
  'InventoryManagement': 'Inventory Management',
  'Library': 'Library',
  'MailOrderSystemClientOrder': 'Mail Order System- Client Order',
  'ManufacturingPlantController': 'Manufacturing Plant Controller',
  'Pizza': 'Pizza System',
  'PoliceSystem': 'Police System',
  'PoliticalEntities': 'Political Entities',
  'realestate': 'Real Estate',
  'RoutesAndLocations': 'Routes And Locations',
  'School': 'School',
  'TelephoneSystem': 'Telephone System',
  'UniversitySystem': 'University System',
  'VendingMachineClassDiagram': 'Vending Machine',
  'WarehouseSystem': 'Warehouse System'
});

const SM_DATA = Immutable.Map({
  'AgentsCommunication': 'Agents Communicating',
  'ApplicationProcessing': 'Application for a Grant',
  'Booking': 'Booking (Airline)',
  'CanalLockStateMachine': 'Canal Lock',
  'CarTransmission': 'Car Transmission',
  'ComplexStateMachine': 'Complex Symbolic',
  'CourseSectionFlat': 'Course Section',
  'CourseSectionNested': 'Course Section (Nested)',
  'DigitalWatchNested': 'Digital Watch Nested',
  'DigitalWatchFlat': 'Digital Watch (Flat)',
  'Elevator_State_Machine': 'Elevator',
  'GarageDoor': 'Garage Door',
  'LibraryLoanStateMachine': 'Library Loan',
  'Lights': 'Light (3 alternatives)',
  'MicrowaveOven2': 'Microwave Oven',
  'Ovens': 'Oven (3 alternatives)',
  'ParliamentBill': 'Parliament Bill',
  'Phone': 'Phone and Lines',
  'Runway': 'Runway',
  'SecurityLight': 'Security Light',
  'SpecificFlight': 'Specific Flight (Airline)',
  'SpecificFlightFlat': 'Specific Flight (Airline - Flat)',
  'TcpIpSimulation': 'TCP/IP Simulation',
  'TelephoneSystem2': 'Telephone Set Modes',
  'TicTacToe': 'Tic Tac Toe or Noughts and Crosses',
  'TollBooth': 'Toll Booth',
  'TrafficLightsA': 'Traffic Lights A',
  'TrafficLightsB': 'Traffic Lights B'
});

const COMP_DATA = Immutable.Map({
  'OBDCarSystem': 'OBD Car System',
  'PingPong': 'Ping Pong'
});

//const DIR = __dirname + '/example/class/';
//CLASS_DATA.forEach((desc, name) => {
//  fs.readFile(DIR + name + '.ump', (err, fileContent) => {
//    if (err) throw err;
//
//    const data = util.format("// @name: %s\n" +
//      "// @desc: %s\n" +
//      "// @end\n %s", name, desc, fileContent);
//    fs.writeFile(DIR + name + '.ump', data, () => {});
//
//  });
//});
//
//const DIR = __dirname + '/example/sm/';
//SM_DATA.forEach((desc, name) => {
//  fs.readFile(DIR + name + '.ump', (err, fileContent) => {
//    if (err) throw err;
//
//    const data = util.format("// @name: %s\n" +
//      "// @desc: %s\n" +
//      "// @end\n\n%s", name, desc, fileContent);
//    fs.writeFile(DIR + name + '.ump', data, () => {});
//
//  });
//});

const DIR = __dirname + '/example/composite/';
COMP_DATA.forEach((desc, name) => {
  fs.readFile(DIR + name + '.ump', (err, fileContent) => {
    if (err) throw err;

    const data = util.format("// @name: %s\n" +
      "// @desc: %s\n" +
      "// @end\n\n%s", name, desc, fileContent);
    fs.writeFile(DIR + name + '.ump', data, () => {});

  });
});






export = app;
