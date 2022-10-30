/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const TransactionBar = ({ transactions, icon, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <View style={styles.informationContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.name}>${transactions.bill.amount}</Text>
        </View>
      </View>
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </View>
  );
};

export default TransactionBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
    minHeight: 30,
  },

  informationContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 130,
    marginEnd: 10,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    paddingStart: 5,
  },
});
