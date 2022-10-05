import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RoomsPage = () => {
<<<<<<< HEAD
  const details = 
    ['Friday', '26 Dec', "Graduation Party", "1800", "Bob's House", "22"];

  const memberList = [
=======
  const list1 = [
    ['Friday', '26 Dec', 'Graduation Party', '1800', "Bob's House", '22'],
>>>>>>> 238c63221b2323fad44ac89601e88e1eed27e21b
    ['Hilary', 'Marcus', 'Jane', 'Jeff', 'Letitia', 'Mark'],
  ];


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>6D</Text>
      </View>

      <View style={styles.middle}>
        
        <View style={styles.event}>
          <Text style={styles.upcomingEvent}>Upcoming Event</Text>
          <EventDetail list={details} />
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.smallText}>Nav Bar</Text>
      </View>
    </View>
  );
};

const EventDetail = props => {
    let styleSheet = '';
  
    return (
      <View style={styles.whiteBox}>
        <View style={styles.left}>
            <View style={styles.date}>
              <Text>Friday</Text>
              <Text>26 Dec</Text>
            </View>
            <View style={styles.eventText}>
              <Text style={styles.event}>Graduation Party!</Text>
            </View>
          </View>
        <View style={styles.right}>
          <View style={styles.purple}>
            <View style={styles.purpleBox}>
              <Text style={styles.purpleBoxText}>Time:</Text>
              <Text style={styles.purpleBoxText}>1800</Text>
            </View>
            <View style={styles.purpleBox}>
              <Text style={styles.purpleBoxText}>Venue:</Text>
              <Text style={styles.purpleBoxText}>Bob's house</Text>
            </View>
            <View style={styles.purpleBoxLast}>
              <Text style={styles.purpleBoxText}>Attendees count:</Text>
              <Text style={styles.count}>22</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

const GuestList = props => {
  return (
    <View>
      <Text style={styles.date}>{props.date}</Text>
      <View>
        {props.list.map(listItem => (
          <Box
            key={listItem[0]}
            name={listItem[0]}
            amount={listItem[1]}
            isReceive={listItem[2]}
          />
        ))}
      </View>
    </View>
  );
};

const Box = props => {
  let styleSheet = '';


  return (
    <View>
      <View style={styles.oneDate}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styleSheet}>{props.amount}</Text>
      </View>
    </View>
  );
};

export default RoomsPage;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    top: 10,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
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

  middle: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '83%',
    maxHeight: '83%',
  },

  bottom: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '7%',
    maxHeight: '7%',
  },


  members: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    width: 370,
    height: 80,
    borderRadius: 15,
  },

  event: {
    flexDirection: 'column',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '30%',
    maxHeight: '30%',
    top: 30,
  },

  whiteBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    width: '75%',
    minHeight: '80%',
    maxHeight: '80%',
    borderRadius: 20,
    justifyContent: 'space-evenly',
  },

  left: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '50%',
    minHeight: '100%',
    maxHeight: '100%',
  },

  date: {
    flexDirection: 'column',
    fontSize: 15,
    fontFamily: 'OleoScript-Bold',
    justifyContent: 'flex-start',
  },



  eventText: {
    flexDirection: 'row',
    fontSize: 15,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
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
  },

  purpleBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#4E1164',
    borderRadius: 10,
    width: "95%",
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
    width: "95%",
  },

  count: {
    fontSize: 20,
    color: '#FFFFFF',
  },


  name: {
    fontSize: 20,
    top: -5,
    left: -110,
    color: '#000000',
  },



  upcomingEvent: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
    top: -5,
    left: -140,
  },

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
  },
});
