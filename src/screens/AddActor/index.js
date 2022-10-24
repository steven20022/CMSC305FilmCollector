import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');

const AddActor = props => {

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onActorAdd = () => {
        if (!firstName){
            alert('Please enter a first name.');
            return;
        }
        if (!lastName){
            alert('Please enter a last name.');
            return;
        }
        
        try {
            database.addActor(firstName, lastName);
        } catch (error) {
            console.log('Error adding actor ' + error);
        }

        alert(firstName + " " + lastName + ' Added!');
        navigation.navigate('Enter FilmCollector!');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={firstName}
                onChangeText={value => setFirstName(value)}
                style={styles.firstname}
                clearButtonMode={'while-editing'}
                placeholder={'Enter First Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={lastName}
                onChangeText={value => setLastName(value)}
                style={styles.lastname}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Last Name'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onActorAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddActor;