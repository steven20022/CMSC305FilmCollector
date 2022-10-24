import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Actor = props => {

    const post = props.post;

    const onPress = () => {
        console.log(post.firstname + ' ' + post.lastname);
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.firstname}>{post.firstname}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.lastname}>{post.lastname}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Actor;