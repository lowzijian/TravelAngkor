import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class Database {

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
    } else {
      console.log("Database was not OPENED");
    }
  };

isVisitedByTitle(title) {
    console.log(title);
    return new Promise((resolve) => {
        SQLite.openDatabase({name: 'sightdb', createFromLocation : '~sightdb.sqlite'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          console.log("Before Query completed");
          tx.executeSql('SELECT isVisited FROM sights WHERE title = ?', [title]).then(([tx,results]) => {
            console.log("Query completed");
            console.log(results);
            if(results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  updateSightVisited(isVisited, title) {
    return new Promise((resolve) => {
      SQLite.openDatabase({name: 'sightdb', createFromLocation : '~sightdb.sqlite'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          tx.executeSql('UPDATE sights SET isVisited = ? WHERE title = ?', [isVisited, title]).then(([tx, results]) => {
            console.log("Update completed");
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }
}