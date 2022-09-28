import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#FFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9D7FD',
  },
});

export default Spinner;
