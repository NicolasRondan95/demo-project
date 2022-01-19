import React, {useState} from 'react';
import {View, TextInput, Text, Alert, StyleSheet} from 'react-native';
import TouchID from 'react-native-touch-id';
import * as keychan from 'react-native-keychain';
import Button from '../components/Button';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

function BiometricDataScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const auth = async () => {
    try {
      let msg;
      const authType = await TouchID.isSupported(optionalConfigObject);

      const credentials = await keychan.getGenericPassword();
      const {username: storedUsername, password: storedPassword} = credentials;

      switch (authType) {
        case 'TouchID':
          msg = 'Auth with touch id';
          break;
        case 'FaceID':
          msg = 'Auth with Face id';
          break;
      }

      if (authType) {
        await TouchID.authenticate(msg, optionalConfigObject);
        if (storedUsername && storedPassword) {
          Alert.alert(
            `Authenticated Successfully: ${storedUsername} ${storedPassword}`,
          );
        } else {
          // Encript data and save in the telephone
          keychan.setGenericPassword(username, password);
        }
      }
    } catch (error) {
      Alert.alert(`Authentication Failed: ${error.code}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Auth" onPress={auth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  text: {
    color: 'white',
  },
});

export default BiometricDataScreen;
