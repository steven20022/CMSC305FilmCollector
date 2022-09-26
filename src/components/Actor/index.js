import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Actor = props => {

    const post = props.post;

    const onPress = () => {
        console.log(post.firstName);
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 2}}>
                <Text style={styles.name} numberOfLines={1}>{post.firstName}</Text>
                <Text style={styles.name} numberOfLines={1}>{post.lastName}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Actor;