/**
 * Created by kevin on 09/01/2016.
 */

import config = require('../config');
import sqlite3 = require('sqlite3');

const db = new sqlite3.Database('../' + config.db.name);

db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='files';", (err, rows) => {

  if (err) throw err;

  // We have a new database
  db.serialize(() => {

    if ( config.db.init || rows.length == 0) {
      // Database needs to be initialized
      const examples:{ files: {name: string, path: string, desc: string}[] } = require('./examples.json');

      db.run("DROP TABLE IF EXISTS files; " +
        "CREATE TABLE files (model_type SMALLINT, " +
        "file_type SMALLINT, " +
        "id VARCHAR(15)," +
        "name VARCHAR(255), " +
        "created_at DATETIME DEFAULT (datetime('now','localtime')), " +
        "updated_at DATETIME DEFAULT (datetime('now','localtime')), " +
        "desc VARCHAR(255), " +
        "path VARCHAR(255)" +
        ")",
        (err) => {
          if (err) throw err;

          var stmt = db.prepare("INSERT INTO files " +
            "(model_type, file_type, id, name, desc, path) " +
            "VALUES (?, ?, ?, ?, ?)");

          const runStmt = Q.nbind(stmt.run, stmt);
          const stmts = examples.files.map((file:{name: string, path: string, desc: string}) => {
            var type: ModelType;

            if (file.path.indexOf('example/class') == 0) {
              type = ModelType.CLASS;
            } else if (file.path.indexOf('example/sm') == 0) {
              type = ModelType.STATE_MACHINE;
            } else if (file.path.indexOf('example/composite') == 0) {
              type = ModelType.COMPOSITE;
            } else {
              type = ModelType.MANUAL;
            }

            const fileType = FileType.EXAMPLE;
            const id = chance['fileId']();

            return runStmt(type, fileType, id, file.name, file.desc, file.path);
          });

          Q.all(stmts).done(() => {
            stmt.finalize();

            db.each("SELECT * FROM files LIMIT 20", (err, row) => {
              if (err) throw err;

              console.log("Row: " + JSON.stringify(row));
            });
          });

        });
    }


  }); // end serialize




});
