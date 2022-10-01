/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Welcome, user!</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.transactions}>
          <View>
            <Text>TO GIVE:</Text>
          </View>
          <View>
            <Text>TO GET:</Text>
          </View>
        </View>

        <View style={styles.roomFunctions}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/add.png')}
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#4E1164',
                padding: 15,
              }}
            />
            <Text onPress={() => navigation.navigate('Splash')}>
              Create Room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => navigation.navigate('TransactionHistory')}>
              Room Invitations
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rooms}>
          <Text>Party Rooms</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  top: {
    flex: 1,
    right: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
  },

  header: {
    fontSize: 25,
    bottom: 10,
    fontFamily: 'OleoScript-Bold',
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
    borderWidth: 5,
    width: '80%',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20,
  },

  roomFunctions: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 5,
    width: '80%',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20,
  },

  rooms: {
    marginTop: 30,
  },
});
