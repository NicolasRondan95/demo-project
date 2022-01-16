import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  PermissionsAndroid,
  Button,
} from 'react-native';
import RNMapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationDemoScreen = () => {
  const [location, setLocation] = useState({
    coords: {latitude: 0, longitude: 0},
  });
  const [tracking, setTracking] = useState(false);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationTracking();
    };
  }, [removeLocationTracking]);

  const requestPermissions = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestPermissions();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log('GET LOCATION: ', position.coords);
      },
      error => {
        setLocation(null);
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };

  const trackLocation = async () => {
    const hasPermission = await requestPermissions();

    if (!hasPermission) {
      return;
    }

    setTracking(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        console.log('TRACK LOCATION: ', position.coords);
        setLocation(position);
      },
      error => {
        console.log(error);
        setLocation(null);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
    console.log('WATCH ID: ', watchId.current);
  };

  const removeLocationTracking = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setTracking(false);
    }
  }, []);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.mapWrapper}>
        <RNMapView
          style={StyleSheet.absoluteFillObject}
          region={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker coordinate={location.coords} />
        </RNMapView>
      </View>
      <View style={styles.controlsWrapperr}>
        <Button title="Get Location" color={'#5041E8'} onPress={getLocation} />
        <Button
          title="Start Observing"
          color={'#5041E8'}
          onPress={trackLocation}
          disabled={tracking}
        />
        <Button
          title="Stop Observing"
          color={'#5041E8'}
          onPress={removeLocationTracking}
          disabled={!tracking}
        />
      </View>
    </View>
  );
};

export default LocationDemoScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#D0D0D0',
  },
  mapWrapper: {
    flex: 1,
  },
  controlsWrapperr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
});
