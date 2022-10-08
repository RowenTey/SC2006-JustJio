import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';

const JoinRoom = ({ navigation }) => {
  const Title = ['Alumni Club', '38 members'];

  const Details = [
    'Name: Reunion Party!',
    'Date: 13 June 2022',
    'Time: 7.30pm',
    'Venue: The Joyden Hall, Bugis',
  ];

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
        <RoomTitle list={Title} />
      </View>
    </View>
  );
};

const RoomTitle = props => {
  let styleSheet = '';

  return (
    <View style={styles.WhiteBox}>
        <Text style={styles.roomheader}>Alumni Club</Text>
        <Text style={styles.numberofpeople}>38 Members</Text>
        <Text style={styles.roomtext}>Name: Reunion Party!</Text>
        <Text style={styles.roomtext}>Date: 13 June 2022</Text>
        <Text style={styles.roomtext}>Time: 7.30pm</Text>
        <Text style={styles.roomtext}>Venue: The Joyden Hall, Bugis</Text>

     <View style={styles.invitation}>
      <Pressable style={styles.greenbox} onPress={() => Alert.alert('Joined Room Successfully')}> 
      <Text style={styles.confirmationboxtext}>Accept</Text> 
      </Pressable>
      <View style={styles.gap}></View>  
      <Pressable style={styles.redbox} onPress={() => Alert.alert('Declined Room Successfully')}> 
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
    bottom: -20,
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
    bottom: -20,
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

  WhiteBox: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    width: 350,
    padding: 20,
    minHeight: '40%',
    maxHeight: '40%',
    borderRadius: 20,
  },

  back: {
    // back arrow
    position: 'relative',
    top: 8,
    right: 75,
  },

  roomheader: {
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

  numberofpeople: {
    //number of people 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
    flexDirection: 'column',
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    bottom: 20,
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
    alignItems: "center",
    backgroundColor: '#f0ecec',
    width: 350,
    height: 250,
    bottom: -10,
  },

  invitation: {
    //just for the accept and decline portion
    flexDirection: 'row',
  },

  gap: {
    //between accept and decline
    marginHorizontal: 20,
  },


});
