import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";
import Actor from '../../components/Actor';

// use hook to create database
const collectorDB = openDatabase({name: 'Collector.db'});
const actorsTableName = 'actors';

const ActorsScreen = props => {

  const navigation = useNavigation();

  const [actor, setActor] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array to store the results from the SELECT
      let results = []
      // declare a transaction that will execute the SELECT
      collectorDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${actorsTableName}`,
          [],
          // callback function to handle the results from the
          // SELECT s
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of actor ' + len);
            // if more than one row was returned
            if (len > 0) {
              // loop through the rows
              for (let i = 0; i < len; i++) {
                // push a row of data at a time onto the
                // results array
                let item = res.rows.item(i)
                results.push({
                  id: item.id,
                  firstName: item.firstName,
                  lastName: item.lastName
                })
              }
              // assign results array to actor state variable
              setActor(results);
            } else {
              // if no rows of data were returned
              // set actor state variable to an empty array
              setActor([])
            }
          },
          error => {
            console.log('Error getting actor ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={actor}
          renderItem={({item}) => <Actor post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Actor')}
                >
                <Text style={styles.buttonText}>Add Actor</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ActorsScreen;