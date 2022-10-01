/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const ICONS = {
  add: require('../../assets/images/add.png'),
  mail: require('../../assets/images/mail.png'),
};

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
          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <View style={styles.roomFunctionButtons}>
              <Image
                source={ICONS.add}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <Text style={styles.roomFunctionText}>Create Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionHistory')}>
            <View style={[styles.roomFunctionButtons, { marginStart: 18 }]}>
              <Image
                source={ICONS.mail}
                style={{
                  width: 40,
                  height: 30,
                }}
              />
            </View>
            <Text style={styles.roomFunctionText}>Room Invitations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rooms}>
          <Text style={styles.roomsTitle}>Party Rooms</Text>
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
    paddingHorizontal: 30,
    marginVertical: 20,
  },

  roomFunctionText: {
    fontWeight: 'bold',
  },

  roomFunctionButtons: {
    alignItems: 'center',
    backgroundColor: '#4E1164',
    padding: 15,
    paddingVertical: 18,
    borderRadius: 15,
    width: 70,
    marginStart: 6,
    marginBottom: 5,
  },

  rooms: {
    marginTop: 30,
  },

  roomsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4E1164',
  },
});
