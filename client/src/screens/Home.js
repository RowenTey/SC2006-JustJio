import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Home = () => {
  return (
    <View>
      <View>
        <Text>Welcome, user!</Text>
      </View>
      <View>
        <Text>TO GIVE:</Text>
      </View>
      <View>
        <Text>TO GET:</Text>
      </View>
      <TouchableOpacity>
        <Text>Create Room</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Room Invitations</Text>
      </TouchableOpacity>
      <View>
        <Text>Party Rooms</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
