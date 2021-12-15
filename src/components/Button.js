import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../utils/colors';

const ButtonComponent = ({onPress, title}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 7,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
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
