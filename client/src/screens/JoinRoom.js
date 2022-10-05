import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native';

const JoinRoom = () => {

  const Title = ['Alumni Club','38 members'];

  const Details = ['Name: Reunion Party!', 'Date: 13 June 2022' , 'Time: 7.30pm', 'Venue: The Joyden Hall,Bugis'];
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
          <RoomTitle list={Title}/>



          </View>
          
          


            
            
          </View>


);
};

const RoomTitle = props => {
  let styleSheet = '';

  return (
    <View style={styles.WhiteBox}>
      <View style={styles.left}>
            <Text style={styles.roomheader}>Alumni Club</Text>
            <Text style={styles.roomheader}>38 Members</Text>
        </View>
        <View style={styles.greenbox}>
            <Text style={styles.header}>


            <Text Button title = "Accept" onPress = {() => Alert.alert('Joined Room Successfully') }/>
            
            <View style={styles.redbox}>
            <Text Button title = "Decline" onPress = {() => Alert.alert('Declined Room Successfully') } />
            </View></Text>
            
            </View>
    </View>
  );
};

export default JoinRoom;

const styles = StyleSheet.create({
    title: { //top of the content 
      backgroundColor: "#E9D7FD",
      width: "100%",
      justifyContent: "center",
      alignItems: 'center',
      paddingVertical: 20,
      height: 80,
      flexDirection : 'row',
    },
    
    container: { //the background colour of the entire application
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EEEEEE',
        height: '100%',
      },

    header: { //text details of the text
        fontSize: 25,
        top: 10,
        fontFamily: 'OleoScript-Bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4E1164',
      },

    greenbox: { //need use two for both accept and decline
        borderRadius: 25,
        width: 135,
        height: 35,
        paddingVertical: 5,
        backgroundColor: '#71C291',
        marginVertical: 10,
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        bottom: -10,
      },
      
      redbox: { //need use two for both accept and decline
        borderRadius: 25,
        width: 135,
        height: 35,
        paddingVertical: 5,
        backgroundColor: '#D2644B',
        marginVertical: 10,
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        bottom: -10,
      },


      WhiteBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        width: '90%',
        padding: 20,
        minHeight: '50%',
        maxHeight: '50%',
        borderRadius: 20,
      },

      back: {
        // back arrow
        position: 'relative',
        top: 8,
        right: 75,
      },

      roomheader: { //top of the content 
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        fontFamily: 'Poppins-Bold',
        height: 20,
        flexDirection : 'row',
      },

      middle: { //middle centralised the whitebox
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0ecec',
        width: 500,
        minHeight: '83%',
        maxHeight: '83%',
      },

});