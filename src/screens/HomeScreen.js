import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/Button';

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
  container: {flex: 1, justifyContent: 'center', padding: 16},
});

export default HomeScreen;
