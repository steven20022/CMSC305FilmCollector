import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Film from '../../components/Film';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const filmCollectorDB = openDatabase({name: 'FilmCollector.db'});
const filmsTableName = 'films';

const AddActorFilm = props => {

  const post = props.route.params.post;

  const navigation = useNavigation();

  const [films, setFilms] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array that will store the results of the
      // SELECT
      let results = [];
      // declare a transation that will execute the SELECT
      filmCollectorDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${filmsTableName}`,
          [],
          // callback function to handle the results from the
          // SELECT s
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of films ' + len);
            // if more than one row was returned
            if (len > 0){
              // loop through the rows
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto the
                // results array
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  title: item.title,
                  rating: item.rating,
                  duration: item.duration,
                  releasedate: item.releasedate,
                  actor_id: post.id
                });
              }
              // assign results array to lists state variable
              setFilms(results);
            } else {
              // if no rows of data were returned,
              // set lists state variable to an empty array
              setFilms([]);
            }
          },
          error => {
            console.log('Error getting films ' + error.message);
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
          data={films}
          renderItem={({item}) => <Film post={item} />}
          keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Film')}
                >
                <Text style={styles.buttonText}>Add Film</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default AddActorFilm;