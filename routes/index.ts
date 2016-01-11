/// <reference path='../typings/tsd.d.ts' />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

import express = require('express');
import fs = require('fs');
import Immutable = require('immutable');

const router = express.Router();

class DiagramSet {
  private class: Immutable.Map<string, string>;
  private state: Immutable.Map<string, string>;

  private composite: Immutable.Map<string, string>;

  private static EXAMPLE_DIR = __dirname + '../../example/';
  private static DIRS = Immutable.Map({
    CLASS:      DiagramSet.EXAMPLE_DIR + 'class/',
    STATE:      DiagramSet.EXAMPLE_DIR + 'sm/',
    COMPOSITE:  DiagramSet.EXAMPLE_DIR + 'composite/',
    MANUAL:     DiagramSet.EXAMPLE_DIR + 'manual/'
  });

  constructor(next: (loaded: DiagramSet) => void) {
    //DiagramSet.DIRS.forEach((dir, i) => {
    //  fs.readdir(dir, (err, files) => {
    //    if (err) {
    //      throw err;
    //    }
    //
    //    // TODO Read the meta data
    //    const EX_DIR = __dirname + '/example/';
    //
    //    _.filter(files, (f) => {
    //      const stat = fs.statSync(EX_DIR + f);
    //      return stat.isFile();
    //    }).forEach((file) => {
    //      var path;
    //      if (MODEL_EXAMPLES.contains(file)) {
    //        path = EX_DIR + 'class/' + file;
    //      } else {
    //        path = EX_DIR + 'sm/' + file;
    //      }
    //      console.log(file + ' -> ' + path);
    //      fs.renameSync(EX_DIR + file, path);
    //    });
    //  });
    //});



  }
}

class RenderData {


  private currentCode: string;

  private DEV: boolean;

  private modelId: string;

  constructor() {

  }

  private static loadDiagrams() {

  }

}

function route(req, res, next) {
  res.render('index', {
    filename: 'filename',
    modelId: 'modelId',
    DEV: true,
    someJava: "class Shape2D {\n" +
    "  center;\n" +
    "}\n" +
    "//Abstract\n" +
    "class EllipticalShape {\n" +
    "  isA Shape2D;\n" +
    "  semiMajorAxis;\n" +
    "}",
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
}

/* GET home page. */
router.get('/', route);

export = router;
