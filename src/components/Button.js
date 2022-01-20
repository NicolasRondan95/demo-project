import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {colors} from '../utils/colors';

const ButtonComponent = ({onPress, title}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {paddingVertical: 13},
  button: {
    elevation: 7,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default ButtonComponent;
