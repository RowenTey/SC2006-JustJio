/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import BottomTab from '../components/BottomTab';
const ICONS = {
  add: require('../../assets/images/add.png'),
  mail: require('../../assets/images/mail.png'),
  group: require('../../assets/images/group.png'),
  mahjong: require('../../assets/images/mahjong.png'),
  vector : require('../../assets/images/Vector.png')

};

import RoomData from '../components/RoomData';
import TempRooms from '../components/TempRooms';
import TransactionBar from '../components/TransactionDetails';
import TransactionData from '../components/TransactionData';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Welcome, user!</Text>
      </View>

      <View style={styles.middle} >
        <View flexDirection = "row">
          <View style = {styles.box}>
            <Text style = {styles.TransactionText}> TO GIVE: </Text>
            <TransactionBar Transactions={TransactionData[4]}/>
            <TransactionBar Transactions={TransactionData[3]}/>

          </View>
          <View style = {styles.box}>
            <Text style = {styles.TransactionText}> TO GET: </Text>
            <TransactionBar Transactions={TransactionData[0]}/>
            <TransactionBar Transactions={TransactionData[1]}/>

          </View>          
        </View>

        <View style={styles.roomFunctions}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('JoinRoom')}>
            <View style={[styles.roomFunctionButtons, { marginStart: 19 }]}>
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

        <Text style={styles.roomsTitle}>Party Rooms</Text>
        <ScrollView>
          <View style={styles.rooms}>
            <FlatList
              data = {TempRooms}
              renderItem = {({ item }) => <RoomData MainRoom={item}/>}
              numColumns = {2}
              key={'_'}
              keyExtractor = {(item) => item.id}/>
          </View>
        </ScrollView>
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
    justifyContent: 'space-between',


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
    paddingHorizontal: 10,
  },

  roomsCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: 10,
    width: 150,
    height: 150,
    margin: 10,
  },

  roomsCardText: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },
  box : { 
    borderRadius :15,
    backgroundColor : '#ffffff',
    paddingHorizontal : 30,
    paddingVertical : 0,
    justifyContent : 'space-between',
    marginTop : 10,
    marginBottom :20,
    marginRight :20,
    marginLeft : 20,

  },

  TransactionText :{

    fontFamily:'Poppins',
    color : '#000000',
    fontWeight : 'bold',
    alignItems : 'flex-start',
  }
});
