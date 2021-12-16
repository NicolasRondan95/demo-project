import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import * as keychan from 'react-native-keychain';

function BiometricDataScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const auth = async () => {
    try {
      let msg;
      const authType = await TouchID.isSupported();

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
        await TouchID.authenticate(msg);
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
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={auth}>
        <Text>Auth</Text>
      </TouchableOpacity>
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
  },
});

export default BiometricDataScreen;
