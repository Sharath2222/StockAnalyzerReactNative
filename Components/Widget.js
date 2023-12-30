// components/Widget.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const Widget = ({ id, type, onRemove }) => {
  return (
    <TouchableOpacity onPress={onRemove} style={styles.widget}>
      <Text>{type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  widget: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Widget;
