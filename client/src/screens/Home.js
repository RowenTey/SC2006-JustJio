/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import RoomCard from '../components/RoomCard.js';
import TransactionBar from '../components/TransactionBar';
import Spinner from '../components/Spinner.js';
import CustomModal from '../components/CustomModal';
import { initialUserState, UserContext } from '../context/user.js';
import { AuthContext } from '../context/auth.js';
import { RoomContext } from '../context/room.js';
import { TransactionContext } from '../context/transaction.js';

const ICONS = {
  add: require('../../assets/images/add.png'),
  mail: require('../../assets/images/mail.png'),
  group: require('../../assets/images/group.png'),
  mahjong: require('../../assets/images/mahjong.png'),
  logout: require('../../assets/images/logout.png'),
  bell: require('../../assets/images/bell.png'),
  tick: require('../../assets/images/tick.png'),
};

const Home = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const { rooms, isRoomsLoading, fetchRooms } = useContext(RoomContext);
  const { toPay, toGet, isTransactionsLoading, payBill, fetchTransactions } =
    useContext(TransactionContext);
  const [modalState, setModalState] = useState({
    showModal: false,
    title: '',
    message: '',
  });

  const handlePayBill = async ({ transaction }) => {
    let curDate = new Date();
    let billData = {
      paidOn: curDate.toString(),
      payee: transaction.payee,
      payer: transaction.payer,
      billId: transaction.billID.toString(),
    };

    try {
      await payBill(billData, transaction.billID);
      setModalState(prev => {
        return {
          ...prev,
          title: 'Yay!',
          message: `You paid ${billData.payee} successfully!`,
          showModal: true,
        };
      });
    } catch (error) {
      console.log('Failed to settle transactions', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(initialUserState);
    navigation.navigate('Signin');
  };

  const onCloseModal = () => {
    setModalState(prev => {
      return {
        ...prev,
        title: '',
        message: '',
        showModal: false,
      };
    });
  };

  useEffect(() => {
    async function fetchData() {
      await fetchRooms();
      await fetchTransactions();
    }
    fetchData();
  }, []);

  if (isRoomsLoading || isTransactionsLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <CustomModal
        title={modalState.title}
        message={modalState.message}
        modalVisible={modalState.showModal}
        closeModal={onCloseModal}
        type="success"
      />

      {!modalState.showModal && (
        <>
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
                  {toPay.length > 0 ? (
                    <FlatList
                      data={toPay}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePayBill(item)}>
                          <TransactionBar
                            transactions={item}
                            icon={ICONS.tick}
                            navigation={navigation}
                            name={item.transaction.payee}
                          />
                        </TouchableOpacity>
                      )}
                      key={'_'}
                      keyExtractor={(item, index) => index}
                    />
                  ) : (
                    <Text style={styles.noAction}>No one to pay</Text>
                  )}
                </View>
              </View>
              <View style={styles.box}>
                <Text style={styles.transactionText}> TO GET: </Text>
                <View style={styles.smallContainer}>
                  {toGet.length > 0 ? (
                    <FlatList
                      data={toGet}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {}}>
                          <TransactionBar
                            transactions={item}
                            icon={ICONS.bell}
                            navigation={navigation}
                            name={item.transaction.payer}
                          />
                        </TouchableOpacity>
                      )}
                      key={'_'}
                      keyExtractor={(item, index) => index}
                    />
                  ) : (
                    <Text style={styles.noAction}>No one to get</Text>
                  )}
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
                  keyExtractor={(item, index) => index}
                />
              ) : (
                <Text style={styles.noRooms}>
                  No rooms to display, create or join a room!
                </Text>
              )}
            </View>
          </View>
        </>
      )}
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
    color: '#808080',
  },

  noAction: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    alignSelf: 'center',
    marginStart: 25,
    color: '#808080',
  },

  smallContainer: {
    flexDirection: 'row',
    height: 100,
  },
});
