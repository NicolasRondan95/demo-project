import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import BiometricDataScreen from './src/screens/BiometricDataScreen';
import Camera from './src/screens/CameraScreen';
import {colors} from './src/utils/colors';

const navTheme = DefaultTheme;
navTheme.colors.background = colors.backgroundApp;

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="BiometricData"
          component={BiometricDataScreen}
          options={{title: 'Native Auth'}}
        />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
