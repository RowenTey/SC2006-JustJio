/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Spinner from '../components/Spinner';
import { AxiosContext } from '../context/axios';

const initialInvitationsState = {
  total: 0,
  invites: [],
};

const JoinRoom = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState(initialInvitationsState);

  const fetchInvitations = async () => {
    setLoading(true);
    const { data: response } = await authAxios.get('/rooms/invites');
    setInvitations({
      total: response.data.length,
      invites: response.data,
    });
    setLoading(false);
  };

  const onAccept = async roomId => {
    setLoading(true);
    const { data: response } = await authAxios.patch(`/rooms/join/${roomId}`);

    setLoading(false);
    navigation.navigate('HomeTab');
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Room Invitations</Text>
      </View>

      <View style={styles.middle}>
        <FlatList
          data={invitations.invites}
          renderItem={({ item }) => <InvitationCard invite={item} />}
          key={'_'}
          keyExtractor={item => item.ID}
        />
      </View>
    </View>
  );
};

const InvitationCard = ({ invite }) => {
  return (
    <View style={styles.whiteBox}>
      <Text style={styles.roomHeader}>{invite.name}</Text>
      <Text style={styles.numberOfPeople}>{invite.attendeesCount} Members</Text>
      <Text style={styles.roomtext}>Date: {invite.date}</Text>
      <Text style={styles.roomtext}>Time: {invite.time}</Text>
      <Text style={styles.roomtext}>Venue: {invite.venue}</Text>

      <View style={styles.invitation}>
        <Pressable
          style={styles.greenbox}
          onPress={() => Alert.alert('Joined Room Successfully')}>
          <Text style={styles.confirmationboxtext}>Accept</Text>
        </Pressable>
        <View style={styles.gap} />
        <Pressable
          style={styles.redbox}
          onPress={() => Alert.alert('Declined Room Successfully')}>
          <Text style={styles.confirmationboxtext}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JoinRoom;

const styles = StyleSheet.create({
  title: {
    //top of the content
    backgroundColor: '#E9D7FD',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: 80,
    flexDirection: 'row',
  },

  container: {
    //the background colour of the entire application
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  header: {
    //text details of the text
    fontSize: 25,
    top: 10,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  greenbox: {
    //accept box
    borderRadius: 25,
    width: 135,
    height: 35,
    backgroundColor: '#71C291',
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
  },

  redbox: {
    //decline box
    borderRadius: 25,
    width: 135,
    height: 35,
    backgroundColor: '#D2644B',
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
  },

  confirmationboxtext: {
    //top of the content
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    color: '#4E1164',
    fontSize: 14,
    padding: 5,
    marginHorizontal: 15,
    textAlign: 'center',
  },

  whiteBox: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    width: 350,
    padding: 20,
    height: 200,
    borderRadius: 20,
    marginVertical: 10,
  },

  back: {
    // back arrow
    position: 'absolute',
    top: -1,
    right: 50,
  },

  roomHeader: {
    //top of the content
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    flexDirection: 'column',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },

  numberOfPeople: {
    //number of people
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
    flexDirection: 'column',
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    bottom: 5,
  },

  roomtext: {
    //top of the content
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
    flexDirection: 'column',
    fontSize: 13,
    color: 'black',
  },

  middle: {
    //move the whitebox to center and top of screen
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0ecec',
    width: 350,
    height: 250,
    bottom: -10,
  },

  invitation: {
    //just for the accept and decline portion
    flexDirection: 'row',
    bottom: -10,
  },

  gap: {
    //between accept and decline
    marginHorizontal: 20,
  },
});
