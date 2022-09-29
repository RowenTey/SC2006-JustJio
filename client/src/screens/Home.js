import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Welcome, user!</Text>
      </View>
      <View>
        <Text>TO GIVE:</Text>
      </View>
      <View>
        <Text>TO GET:</Text>
      </View>
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('Splash')}>Create Room</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('TransactionHistory')}>
          Room Invitations
        </Text>
      </TouchableOpacity>
      <View>
        <Text>Party Rooms</Text>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
  },

  header: {
    fontSize: 25,
    top: 10,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },
});
