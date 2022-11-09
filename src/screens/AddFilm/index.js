import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');

const AddFilm = props => {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [releasedate, setReleaseDate] = useState('');

    const onFilmAdd = () => {
        if (!title){
            alert('Please enter a title.');
            return;
        }
        if (!rating){
            alert('Please enter a rating.');
            return;
        }
        if (!duration){
            alert('Please enter a duration.');
            return;
        }
        if (!releasedate){
            alert('Please enter a release date.');
            return;
        }
        
        try {
            database.addFilm(title, rating, duration, releasedate);
        } catch (error) {
            console.log('Error adding film ' + error);
        }

        alert(title + ' Added!');
        navigation.navigate('Enter FilmCollector!');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={title}
                onChangeText={value => setTitle(value)}
                style={styles.title}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Title'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={rating}
                onChangeText={value => setRating(value)}
                style={styles.rating}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Rating'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={duration}
                onChangeText={value => setDuration(value)}
                style={styles.duration}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Duration'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={releasedate}
                onChangeText={value => setReleaseDate(value)}
                style={styles.releasedate}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Release Date'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onFilmAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddFilm;