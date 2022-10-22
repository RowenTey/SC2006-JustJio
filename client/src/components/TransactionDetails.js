/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const TransactionBar = ({ transactions }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: transactions.imageURL }}
        style={{ width: 30, height: 30 }}
      />
      <View style={styles.informationContainer}>
        <Text style={styles.name}>{transactions.name}</Text>

        <Text style={styles.name}>{transactions.amount}</Text>
      </View>
    </View>
  );
};

export default TransactionBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 10,
  },

  informationContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  top: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E9D7FD',
    minHeight: '7%',
    maxHeight: '7%',
  },

  header: {
    fontSize: 25,
    bottom: 9,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    alignItems: 'center',
    width: '100%',
    maxHeight: '83%',
  },

  transactions: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    width: '80%',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20,
  },

  roomFunctions: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    padding: 20,
    paddingHorizontal: 30,
    marginTop: -15,
  },

  roomFunctionText: {
    fontWeight: 'bold',
    marginTop: 3,
  },

  roomFunctionButtons: {
    alignItems: 'center',
    backgroundColor: '#4E1164',
    padding: 15,
    paddingVertical: 18,
    borderRadius: 15,
    width: 70,
    marginStart: 6,
  },

  roomsTitle: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
    marginTop: -5,
  },

  rooms: {
    marginTop: -10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
