/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import RoomCard from '../components/RoomCard.js';
import TransactionBar from '../components/TransactionDetails';
import TransactionData from '../components/TransactionData';
import Spinner from '../components/Spinner.js';
import { initialUserState, UserContext } from '../context/user.js';
import { AuthContext } from '../context/auth.js';
import { RoomContext } from '../context/room.js';
import { TransactionContext } from '../context/transaction.js';

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

const Home = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const { rooms, isRoomsLoading, fetchRooms } = useContext(RoomContext);
  const { transactions, fetchTransactions } = useContext(TransactionContext);

  useEffect(() => {
    fetchRooms();
    fetchTransactions();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(initialUserState);
    navigation.navigate('Signin');
  };
  const duplicateTransactions = transactions;

  if (isRoomsLoading) {
    return <Spinner />;
  }
  console.log(duplicateTransactions);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>
          Welcome, {user ? user.username : 'user'}!
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={ICONS.logout}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <View flexDirection="row">
          <View style={styles.box}>
            <Text style={styles.transactionText}> TO GIVE: </Text>
            <View style={styles.smallContainer}>
              <FlatList
                data={transactions}
                renderItem={({ item }) =>
                  item.transaction.payer != user.username ? (
                    <TransactionBar
                      transactions={item}
                      icon={ICONS.tick}
                      navigation={navigation}
                      name={item.transaction.payer}
                    />
                  ) : null
                }
                key={'_'}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.transactionText}> TO GET: </Text>
            <View style={styles.smallContainer}>
              <FlatList
                data={duplicateTransactions}
                renderItem={({ item }) =>
                  item.transaction.payer == user.username ? (
                    <TransactionBar
                      transactions={item}
                      icon={ICONS.bell}
                      navigation={navigation}
                      name={item.transaction.payee}
                    />
                  ) : null
                }
                key={'_'}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>

        <View style={styles.roomFunctions}>
          <TouchableOpacity
            style={{ marginStart: 10 }}
            onPress={() => navigation.navigate('CreateRoom')}>
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
        <View style={{ flex: 1 }}>
          {rooms.length > 0 ? (
            <FlatList
              data={rooms}
              renderItem={({ item }) => (
                <RoomCard mainRoom={item} navigation={navigation} />
              )}
              numColumns={2}
              key={'_'}
              keyExtractor={item => item.ID}
            />
          ) : (
            <Text style={styles.noRooms}>
              No rooms to display, create or join a room!
            </Text>
          )}
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
    flexDirection: 'row',
    backgroundColor: '#E9D7FD',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    minHeight: '9%',
    maxHeight: '9%',
  },

  header: {
    fontSize: 18,
    top: 5,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  logout: {
    fontSize: 25,
    top: 3,
    position: 'relative',
    justifySelf: 'flex-end',
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    alignItems: 'center',
    width: '100%',
    maxHeight: '91%',
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
    marginTop: -15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginStart: 32,
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

  box: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    width: 180,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 5,
  },

  transactionText: {
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },

  noRooms: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 35,
    paddingHorizontal: 30,
  },

  smallContainer: {
    flexDirection: 'row',
    height: 100,
  },
});
