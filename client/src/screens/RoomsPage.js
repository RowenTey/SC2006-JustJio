import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList, 
} from 'react-native';

const RoomsPage = ({ navigation, route }) => {
  const { room } = route.params;
  const details = [
    //'Friday',
    //'26 Dec',
    //'Graduation Party',
    //'1800 - 2300',
    //"Bob's House",
    //'22',
  ];

  const MemberList = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Hilary',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Marcus',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Jane',
    },

  
    //'Jeff',
    //'Letitia',
    //'Mark',
    //'Layla',
    //'Fred',
    //'Adrian',
  ];

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
          <Text style={styles.upcomingEvent}>Upcoming Event</Text>
          <EventDetail room={room} />
        </View>
        <View style={styles.memberList}>
          <Text style={styles.list}>Members</Text>
          <GuestList list={MemberList} />
        </View>
        <View style={styles.splitBillCloseRoom}>
          <View style={styles.splitBill}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SplitBillMembers')}>
              <Text style={styles.buttonText}>Split Bill</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.closeRoom}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Close Room</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.urlQrCode}>
          <View style={styles.url}>
            <Text style={styles.urlText}>URL:</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>http://www.JoinRoom/6D.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.qrCode}>
            <Text style={styles.urlText}>QR Code:</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>QRCODE</Text>
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
        day="Sunday"
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
  return (
    <View style={styles.whiteBox}>
      <View style={styles.left}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{props.day}</Text>
          <Text style={styles.dateText}>{props.date}</Text>
        </View>
        <View style={styles.eventBox}>
          <Text style={styles.eventText}>Event: {props.eventName}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.purple}>
          <View style={styles.purpleBox}>
            <Text style={styles.purpleBoxText}>Time: {props.time}</Text>
          </View>
          <View style={styles.purpleBox}>
            <Text style={styles.purpleBoxText}>Venue: {props.venue}</Text>
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
  const renderItem = ({ item }) => (
    <Box name={item.name} />
  );
  return (
    <View style={styles.memberBox}>
      <ScrollView>
      <FlatList
        data={props.list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </ScrollView>
    </View>
  );
};

const Box = props => {
  return (
    <View style={styles.indName}>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

export default RoomsPage;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    top: 8,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  back: {
    // back arrow
    position: 'relative',
    justifyContent: 'flex-start',
    top: 8,
    right: 150,
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

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
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
  },

  middle: {
    top: 30,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '90%',
    maxHeight: '90%',
    position: 'relative',
  },

  event: {
    flexDirection: 'column',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '28%',
    maxHeight: '28%',
    paddingHorizontal: 15,
  },

  whiteBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    width: '75%',
    minHeight: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    position: 'relative',
  },

  left: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '50%',
    minHeight: '100%',
    maxHeight: '100%',
    position: 'relative',
  },

  date: {
    flexDirection: 'column',
    fontSize: 20,
    fontFamily: 'OleoScript-Bold',
    left: 20,
  },

  dateText: {
    fontFamily: 'OleoScript-Bold',
    fontSize: 15,
    position: 'relative',
  },

  eventBox: {
    flexDirection: 'column',
    top: 40,
    left: -40,
    position: 'relative',
  },

  eventText: {
    fontSize: 25,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
    color: '#000000',
    position: 'relative',
  },

  right: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '50%',
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

  purpleBoxText: {
    fontSize: 15,
    color: '#FFFFFF',
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
    minHeight: '46%',
    maxHeight: '46%',
    position: 'relative',
    paddingHorizontal: 15,
  },

  memberBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E9D7FD',
    width: '75%',
    minHeight: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    justifyContent: 'space-around',
  },

  indName: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 340,
    height: 50,
    borderRadius: 10,
    margin: 5,
    top: 5,
    bottom: 5,
  },

  count: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  name: {
    fontSize: 18,
    top: 10,
    left: 100,
    color: '#000000',
  },

  upcomingEvent: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: -5,
    left: -120,
  },

  list: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    left: -140,
    top: -5,
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
    left: 10,
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
    top: 7,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },

  urlQrCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    minHeight: '13%',
    maxHeight: '13%',
    position: 'relative',
  },

  urlText: {
    fontSize: 15,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },
});
