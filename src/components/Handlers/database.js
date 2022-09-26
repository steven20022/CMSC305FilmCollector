// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const collectorDB = openDatabase({name: 'Collector.db'});
const actorsTableName = 'actors';

module.exports = {
    // declare function that will create the lists table
    createActorsTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await collectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${actorsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    firstName TEXT,
                    lastName TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Actors table created successfully');
                },
                error => {
                    console.log('Error creating actors table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the lists table
    addActor: async function (firstName, lastName) {
        // declare a transaction that will execute an SQL statement
        (await collectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${actorsTableName} (firstName, lastName) VALUES ("${firstName}", "${lastName}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(firstName + " " + lastName + " added successfully");
                },
                error => {
                    console.log('Error adding actor ' + error.message);
                },
            );
        });
    },
};