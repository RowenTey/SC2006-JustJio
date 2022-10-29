/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Spinner from '../components/Spinner';
import { AxiosContext } from '../context/axios';
import { UserContext } from '../context/user';
import { RoomContext } from '../context/room';

const RoomsPage = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const { authAxios } = useContext(AxiosContext);
  const { closeRoom } = useContext(RoomContext);
  const { room } = route.params;

  const [day, month, year] = room.date.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();

  const onCloseRoom = async roomId => {
    setLoading(true);
    await closeRoom(roomId);
    setLoading(false);
    navigation.navigate('HomeTab');
  };

  const fetchAttendees = async roomId => {
    setLoading(true);
    try {
      const { data: response } = await authAxios.get(
        `/rooms/attendees/${roomId}`,
      );
      setAttendees(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching attendees', error.message);
    }
  };

  useEffect(() => {
    fetchAttendees(room.ID);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{room.name}</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.event}>
          <Text style={styles.upcomingEvent}>
            {currentDate > date ? 'Passed' : 'Upcoming'} Event
          </Text>
          <EventDetail room={room} />
        </View>
        <View style={styles.memberList}>
          <Text style={styles.list}>Members</Text>
          <GuestList list={attendees} />
        </View>
        <View style={styles.splitBillCloseRoom}>
          <TouchableOpacity
            style={[
              styles.splitBill,
              {
                left: user.username === room.host ? 10 : 0,
              },
            ]}
            onPress={() =>
              navigation.navigate('SplitBillMembers', {
                payers: attendees.filter(payee => payee !== user.username),
                room,
              })
            }>
            <Text style={styles.buttonText}>Split Bill</Text>
          </TouchableOpacity>
          {user.username === room.host && (
            <TouchableOpacity
              style={styles.closeRoom}
              onPress={() => onCloseRoom(room.ID)}>
              <Text style={styles.buttonText}>Close Room</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.urlQrCode}>
          <View style={styles.url}>
            <Text style={styles.urlText}>URL:</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>
                http://www.justjio/{room.name.replaceAll(' ', '-')}.com
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.qrCode}>
            <Text style={styles.urlText}>QR Code:</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.QRText}>QRCODE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const EventDetail = ({ room }) => {
  return (
    <View>
      <EventDetailBox
        date={room.date}
        eventName={room.name}
        time={room.time}
        venue={room.venue}
        attendees={room.attendeesCount}
      />
    </View>
  );
};

const EventDetailBox = props => {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [day, month, year] = props.date.split('/');
  const date = new Date(`${year}-${month}-${day}`);

  return (
    <View style={styles.whiteBox}>
      <View style={styles.left}>
        <View style={styles.date}>
          <Text style={styles.dateTextDay}>{weekday[date.getDay()]}</Text>
          <Text style={styles.dateTextDate}>{props.date}</Text>
        </View>
        <View style={styles.eventBox}>
          <Text style={styles.eventTextEvent}>Event: </Text>
          <Text style={styles.eventText}>{props.eventName}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.purple}>
          <View style={styles.purpleBox}>
            <Text style={styles.purpleBoxTextFirstBox}>Time: {props.time}</Text>
          </View>
          <View style={styles.purpleBox}>
            <Text style={styles.purpleBoxText}>
              Venue: {props.venue.toUpperCase()}
            </Text>
          </View>
          <View style={styles.purpleBoxLast}>
            <Text style={styles.purpleBoxText}>Attendees count:</Text>
            <Text style={styles.count}>{props.attendees}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const GuestList = props => {
  return (
    <View style={styles.memberBox}>
      <FlatList
        data={props.list}
        renderItem={({ item }) => <Box name={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const Box = props => {
  return (
    <View style={styles.indName}>
      <Image
        source={{
          width: 35,
          height: 35,
          uri: 'https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg',
        }}
      />
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

export default RoomsPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    position: 'relative',
  },

  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 30,
    top: 5,
    marginLeft: 'auto',
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  back: {
    // back arrow
    position: 'relative',
    top: 3,
    justifyContent: 'flex-start',
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  middle: {
    top: 10,
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '90%',
    maxHeight: '90%',
    position: 'relative',
    paddingHorizontal: 20,
  },

  event: {
    flexDirection: 'column',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '32%',
    maxHeight: '32%',
    paddingHorizontal: 15,
    marginTop: 10,
  },

  whiteBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    width: '80%',
    minHeight: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    position: 'relative',
  },

  left: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: 180,
    minHeight: '100%',
    maxHeight: '100%',
    position: 'relative',
  },

  date: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: 16,
    left: 11,
    marginTop: 2,
  },

  dateTextDay: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 13,
    position: 'relative',
  },

  dateTextDate: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 20,
    position: 'relative',
    top: -5,
  },

  eventBox: {
    flexDirection: 'column',
    position: 'relative',
    width: '85%',
    left: 11,
    top: -5,
  },

  eventTextEvent: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    color: '#000000',
    position: 'relative',
    marginTop: 8,
    marginBottom: -10,
  },

  eventText: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    color: '#000000',
    position: 'relative',
  },

  right: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: 180,
    minHeight: '100%',
    maxHeight: '100%',
    alignItems: 'center',
  },

  purple: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'relative',
  },

  purpleBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#4E1164',
    borderRadius: 10,
    width: '95%',
    position: 'relative',
    marginBottom: 5,
    padding: 5,
  },

  purpleBoxTextFirstBox: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },

  purpleBoxText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },

  purpleBoxLast: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#4E1164',
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    marginBottom: 10,
  },

  memberList: {
    flexDirection: 'column',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '39%',
    maxHeight: '39%',
    position: 'relative',
    paddingHorizontal: 15,
    padding: 10,
  },

  memberBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E9D7FD',
    width: '80%',
    minHeight: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    justifyContent: 'space-around',
  },

  indName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingStart: 15,
    width: 320,
    height: 50,
    borderRadius: 10,
    margin: 5,
    top: 5,
    bottom: 5,
  },

  count: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },

  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    left: 20,
    color: '#000000',
  },

  upcomingEvent: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontFamily: 'Poppins-Medium',
    top: -5,
    left: -110,
  },

  list: {
    fontSize: 15,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    left: -120,
    top: -5,
    fontFamily: 'Poppins-Medium',
  },

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
  },

  splitBillCloseRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    minHeight: '10%',
    maxHeight: '10%',
    position: 'relative',
    top: 5,
    paddingHorizontal: 15,
    marginTop: 10,
  },

  splitBill: {
    backgroundColor: '#f2ec5c',
    borderRadius: 10,
    width: '35%',
    minHeight: '80%',
    maxHeight: '80%',
    position: 'relative',
    marginBottom: 5,
    padding: 5,
    alignItems: 'center',
  },

  closeRoom: {
    backgroundColor: '#f26a6a',
    borderRadius: 10,
    width: '35%',
    minHeight: '80%',
    maxHeight: '80%',
    position: 'relative',
    marginBottom: 5,
    padding: 5,
    alignItems: 'center',
    right: 10,
  },

  buttonText: {
    top: 5,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
  },

  QRText: {
    fontSize: 20,
    marginTop: -5,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
  },

  urlQrCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    minHeight: '13%',
    maxHeight: '13%',
    position: 'relative',
    marginTop: 3,
  },

  qrCode: {
    marginTop: 10,
  },

  urlText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },
});
