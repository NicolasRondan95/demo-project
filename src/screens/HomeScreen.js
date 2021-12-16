import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Button from '../components/Button';
import Logo from '../assets/toptive_logo_purple_white_256px.png';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={Logo} />
      </View>
      <Button title="Go to Camera Demo" onPress={() => navigate('Camera')} />
      <Button
        title="Go to Auth Demo"
        onPress={() => navigate('BiometricData')}
      />
      <Button
        title="Go to Location Demo"
        onPress={() => navigate('Location')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {justifyContent: 'center', alignItems: 'center', bottom: 25},
  image: {
    height: 150,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default HomeScreen;
