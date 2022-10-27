/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Spinner from '../components/Spinner';
import { AxiosContext } from '../context/axios';
import { RoomContext } from '../context/room';

const initialInvitationsState = {
  total: 0,
  invites: [],
};

const INVITATION_ACTIONS = {
  JOiN: 'join',
  DECLINE: 'decline',
};

const JoinRoom = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const { joinRoom, declineRoom } = useContext(RoomContext);
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState(initialInvitationsState);

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const { data: response } = await authAxios.get('/rooms/invites');
      setInvitations({
        total: response.data.length,
        invites: response.data,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching invitations', error);
    }
  };

  const onClick = async (roomId, type) => {
    setLoading(true);

    if (type === INVITATION_ACTIONS.JOiN) {
      await joinRoom(roomId);
    } else if (type === INVITATION_ACTIONS.DECLINE) {
      await declineRoom(roomId);
    }
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

      <View
        style={[
          styles.middle,
          {
            justifyContent:
              invitations.invites.length > 0 ? 'space-around' : 'center',
          },
        ]}>
        {invitations.invites.length > 0 ? (
          <FlatList
            data={invitations.invites}
            renderItem={({ item }) => (
              <InvitationCard invite={item} handleClick={onClick} />
            )}
            key={'_'}
            keyExtractor={item => item.ID}
          />
        ) : (
          <Text style={styles.noInvitation}>No invitations</Text>
        )}
      </View>
    </View>
  );
};

const InvitationCard = ({ invite, handleClick }) => {
  return (
    <View style={styles.whiteBox}>
      <Text style={styles.roomHeader}>{invite.name}</Text>
      <Text style={styles.numberOfPeople}>{invite.attendeesCount} Members</Text>
      <Text style={styles.roomText}>Date: {invite.date}</Text>
      <Text style={styles.roomText}>Time: {invite.time}</Text>
      <Text style={styles.roomText}>Venue: {invite.venue}</Text>

      <View style={styles.invitation}>
        <TouchableOpacity
          style={styles.greenBox}
          onPress={() => handleClick(invite.ID, INVITATION_ACTIONS.JOiN)}>
          <Text style={[styles.confirmationBoxText, { color: '#71C291' }]}>
            Accept
          </Text>
        </TouchableOpacity>
        <View style={styles.gap} />
        <TouchableOpacity
          style={styles.redBox}
          onPress={() => handleClick(invite.ID, INVITATION_ACTIONS.DECLINE)}>
          <Text style={[styles.confirmationBoxText, { color: '#D2644B' }]}>
            Decline
          </Text>
        </TouchableOpacity>
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

  greenBox: {
    //accept box
    borderRadius: 25,
    borderColor: '#71C291',
    borderWidth: 5,
    width: 135,
    height: 35,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
  },

  redBox: {
    //decline box
    borderRadius: 25,
    borderColor: '#D2644B',
    borderWidth: 5,
    width: 135,
    height: 35,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
  },

  confirmationBoxText: {
    //top of the content
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    fontSize: 15,
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

  roomText: {
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

  noInvitation: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
});
