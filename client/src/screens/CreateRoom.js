import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// for images being imported in no need to specify dimensions
// for images online need to specify dimensions such as width: height: uri:(image url)

var roomData = {
  eventName: '',
  date: '',
  time: '',
  venue: '',
  invitees: '',
};

const CreateRoom = () => {
  // still need to define logic of ensuring have event name, date, time and venue
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Create Room</Text>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.roomText}>Name of Event:</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.roomText}>
            Date: <Text style={styles.highlightGrey}>dd/mm/yyyy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.roomText}>Time:</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.roomText}>Venue:</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.roomText}>
            Invitees: <Text style={styles.highlightGrey}> usernames</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.confirmationBox}
            onPress={console.log('Successful click')}>
            Create Room
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  title: {
    // top of the content
    backgroundColor: '#E9D7FD',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: 80,
    flexDirection: 'row',
  },

  container: {
    // the background colour of the entire application
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  container2: {
    // the main part of the application
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  box: {
    // white boxes to key in the event details
    width: 331,
    backgroundColor: 'white',
    color: '#6C6C6B',
    fontSize: 13,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  header: {
    // text details of the text
    fontSize: 25,
    top: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  roomText: {
    // text that is written in the boxes
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  // change the text to grey in the same line
  highlightGrey: {
    color: 'grey',
  },

  confirmationBox: {
    borderRadius: 25,
    width: 180,
    height: 35,
    paddingVertical: 5,
    backgroundColor: '#E9D7FD',
    marginVertical: 10,
    color: '#4E1164',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    bottom: -10,
  },

  backarrow: {
    position: 'absolute',
    margin: 8,
    borderRadius: 10,
  },
});
