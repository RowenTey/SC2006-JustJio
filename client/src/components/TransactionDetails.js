/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageURISource,
  useContext,
} from 'react-native';
import { initialUserState, UserContext } from '../context/user.js';
import { AuthContext } from '../context/auth.js';
import { RoomContext } from '../context/room.js';

const ICONS = {
  add: require('../../assets/images/add.png'),
  mail: require('../../assets/images/mail.png'),
  group: require('../../assets/images/group.png'),
  mahjong: require('../../assets/images/mahjong.png'),
  vector: require('../../assets/images/Vector.png'),
  logout: require('../../assets/images/logout.png'),
  bell: require('../../assets/images/bell.png'),
  tick: require('../../assets/images/tick.png'),
};

const TransactionBar = ({ transactions, navigation, icon, name }) => {
  
  
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
