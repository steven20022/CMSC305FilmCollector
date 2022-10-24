// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const filmCollectorDB = openDatabase({name: 'FilmCollector.db'});
const actorsTableName = 'actors';
const filmsTableName = 'films';

module.exports = {
    // declare function that will create the actors table
    createActorsTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await filmCollectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${actorsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    firstname TEXT,
                    lastname TEXT
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

    // declare function that will insert a row into the actors table
    addActor: async function (firstname, lastname) {
        // declare a transaction that will execute an SQL statement
        (await filmCollectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${actorsTableName} (firstname, lastname) VALUES ("${firstname}", "${lastname}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(firstname + " " + lastname + " added successfully");
                },
                error => {
                    console.log('Error adding actor ' + error.message);
                },
            );
        });
    },

    // declare function that will create the films table
    createFilmsTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await filmCollectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${filmsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    rating TEXT,
                    duration INTEGER,
                    releasedate TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Films table created successfully');
                },
                error => {
                    console.log('Error creating films table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the films table
    addFilm: async function (title, rating, duration, releasedate) {
        // declare a transaction that will execute an SQL statement
        (await filmCollectorDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${filmsTableName} (title, rating, duration, releasedate) VALUES ("${title}", "${rating}", ${duration}, "${releasedate}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(title + " added successfully");
                },
                error => {
                    console.log('Error adding title ' + error.message);
                },
            );
        });
    },
};