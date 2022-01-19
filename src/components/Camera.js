import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function Camera({setImageUri}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const onCapture = async () => {
    try {
      const picture = await takePicture();
      const filePath = picture.uri;
      setImageUri(filePath);
      console.log(`Picture was saved in ${filePath}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <Icon
          name="camera"
          size={50}
          color="#fff"
          onPress={() => onCapture()}
          activeOpacity={0.5}
          style={styles.btnAlignment}></Icon>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  btnAlignment: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
