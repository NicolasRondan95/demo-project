import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -33.132876;
const LONGITUDE = -64.352561;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_COORDINATES = [
  {
    // TopTive
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  {
    // Clinica regional del sud
    latitude: -33.129095953279666,
    longitude: -64.35136312372927,
  },
];
const GOOGLE_MAPS_APIKEY = 'AIzaSyCj9uvC5MIY9dS7vA3cdHNRyP3W2phMj5o';

const LocationDemoScreen = () => {
  const [coordinates, setCoordinates] = useState(INITIAL_COORDINATES);

  const onMapPress = e => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  return (
    <MapView
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={StyleSheet.absoluteFill}
      ref={c => (this.mapView = c)}
      onPress={onMapPress}>
      {coordinates.map((coordinate, index) => (
        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
      ))}
      {coordinates.length >= 2 && (
        <MapViewDirections
          origin={coordinates[0]}
          waypoints={coordinates.length > 2 ? coordinates.slice(1, -1) : []}
          destination={coordinates[coordinates.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);

            this.mapView.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            });
          }}
          onError={errorMessage => {
            console.log('GOT AN ERROR');
          }}
        />
      )}
    </MapView>
  );
};

export default LocationDemoScreen;
