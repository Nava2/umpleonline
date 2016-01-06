/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    filename: 'filename',
    modelId: 'modelId',
    DEV: true,
    classDiagrams: {
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
    }
  });
});

export = router;
