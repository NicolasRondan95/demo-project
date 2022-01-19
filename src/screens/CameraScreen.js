import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import Camera from '../components/Camera';

export default function CameraScreen() {
  const [imageUri, setImageUri] = useState(null);
  return (
    <>
      {imageUri ? (
        <View style={{flex: 1}}>
          <Image source={{uri: imageUri}} style={styles.image}></Image>
          <Text style={styles.cancel} onPress={() => setImageUri(null)}>
            Go Back
          </Text>
        </View>
      ) : (
        <Camera setImageUri={setImageUri} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    bottom: 0,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
});
