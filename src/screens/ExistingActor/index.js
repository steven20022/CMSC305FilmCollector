import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from 'react-native-sqlite-storage';

// use hook to create database
const filmCollectorDB = openDatabase({name: 'FilmCollector.db'});
const actorsTableName = 'actors';

const ExistingActor = props => {

    const post = props.route.params.post;

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState(post.firstname);
    const [lastName, setLastName] = useState(post.lastname);

    const onActorUpdate = () => {
        if (!firstName){
            alert('Please enter a first name.');
            return;
        }
        if (!lastName){
            alert('Please enter a last name.');
            return;
        }
        
        filmCollectorDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${actorsTableName} SET firstname = '${firstName}', lastname = '${lastName}' WHERE id = ${post.id}`,
                [],
                () => {
                    console.log(`${firstName} ${lastName} updated successfully.`);
                },
                error => {
                    console.log('Error on updating actor ' + error.message);
                }
            );
        });

        alert(firstName + ' ' + lastName + ' updated!')
        navigation.navigate('Enter FilmCollector!');
    }

    const onActorDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this actor?',
            // buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        filmCollectorDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${actorsTableName} WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${firstName} ${lastName} deleted successfully.`);
                                },
                                error => {
                                    console.log('Error on deleting actor ' + error.message);
                                }
                            );
                        });
                
                        alert(firstName + ' ' + lastName + ' deleted!')
                        navigation.navigate('Enter FilmCollector!');
                    },
                },
                {
                    text: 'No',
                },
            ]
        );
    }

    const onAddFilm = () => {
        navigation.navigate('Add Actor Film', {post: post});
    }

    const onViewActor = () => {
        navigation.navigate('View Actor Films', {post: post});
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
            <Pressable style={styles.updateButton} onPress={onActorUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onActorDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={onAddFilm}>
                <Text style={styles.buttonText}>Add Film</Text>
            </Pressable>
            <Pressable style={styles.viewButton} onPress={onViewActor}>
                <Text style={styles.buttonText}>View Films</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingActor;