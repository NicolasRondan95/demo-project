import React from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View>
      <Text style={styles.text}>Hi there!</Text>
      <Button title="Go to Camera Demo" onPress={() => navigate('Camera')} />
      <Button
        title="Go to Location Demo"
        onPress={() => navigate('Location')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
