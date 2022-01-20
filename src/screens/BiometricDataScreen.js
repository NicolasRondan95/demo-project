import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import * as keychain from 'react-native-keychain';
import Button from '../components/Button';

// Config for auth request
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
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [biometryType, setBiometryType] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await keychain.getGenericPassword();
        if (credentials) {
          setIsAuth(true);
          setUserData(credentials);
          console.log(
            `Credentials successfully loaded for user ${credentials.username}`,
          );
        } else {
          console.log('No credentials stored');
        }
        // Check if the device supports biometric data
        const biometryType = await TouchID.isSupported(optionalConfigObject);
        setBiometryType(biometryType);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const auth = async () => {
    if (!username || !password) return;
    try {
      // Handle authentication
      let msg;
      switch (biometryType) {
        case 'TouchID':
          msg = 'Auth with TouchID';
          break;
        case 'FaceID':
          msg = 'Auth with FaceID';
          break;
      }
      if (biometryType) {
        await TouchID.authenticate(msg, optionalConfigObject);
        Alert.alert(`Authenticated Successfully: ${username}!`);
      }
      // Encript data and save in the device
      await keychain.setGenericPassword(username, password);
      setUserData({username, password});
      setUsername('');
      setPassword('');
      setIsAuth(true);
    } catch (err) {
      Alert.alert(`Authentication Failed: ${err}`);
    }
  };

  const exit = async () => {
    const result = await keychain.resetGenericPassword();
    console.log(`User credentials removed: ${result}`);
    if (result) {
      setIsAuth(false);
      setUserData({});
    }
  };

  return (
    <View style={styles.container}>
      {isAuth ? (
        <View>
          <Text style={styles.title}>Hi, {userData.username}!</Text>
          <Button title="Exit" onPress={exit} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Auth Form</Text>
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            placeholder="Type username"
            onChangeText={text => setUsername(text)}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Type password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <Button title="Auth" onPress={auth} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    color: 'black',
    width: Dimensions.get('window').width * 0.8,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  title: {
    color: 'white',
    marginBottom: 16,
    fontSize: 30,
  },
  text: {
    color: 'white',
  },
});

export default BiometricDataScreen;
