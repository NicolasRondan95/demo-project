import * as React from 'react';
import {StyleSheet, Button, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      <Button title="Go to Camera Demo" onPress={() => navigate('Camera')} />
      <Button
        title="Go to Location Demo"
        onPress={() => navigate('Location')}
      />
      <Button
        title="Go to Face Detection Demo"
        onPress={() => navigate('FaceDetection')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 20, padding: 20},
});

export default HomeScreen;
