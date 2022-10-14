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
import BottomTab from '../navigation/BottomTab';

const SplitBill = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Split Bill</Text>
      </View>

      <View style={styles.middle}>
      <Text style={styles.billTopText}>Bill for:  6D </Text>
        <View style = {styles.topLineStyle} /> 
        <Text style={styles.billText}>Bill name: </Text>
        <View style={styles.gap}></View>  
        <Text style={styles.billText}>Drinks </Text>
        <View style = {styles.lineStyle} /> 
        <View style={styles.gap}></View>  
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
            style={styles.qrcode}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.billText}>Amount to split: </Text>
        <View style={styles.gap}></View>  
        <Text style={styles.billText}>$ 50.00 </Text>
        <View style = {styles.lineStyle} />  
      </View>
    </View>
  );
};

export default SplitBill;

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

  
  middle: {
    //move the whitebox to center and top of screen
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    width: 350,
    height: 250,
    bottom: -10,
  },

  container: {
    //the background colour of the entire application
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  header: {
    //text details of the page header text
    fontSize: 25,
    top: 8,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },


  billText: {
    //text details of the text
    fontSize: 20,
    top: 10,
    fontFamily: 'Poppins',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
    marginLeft: 30,
  },

  billTopText: {
    //text details of the text
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#4E1164',
    marginLeft: 12,
  },

  topLineStyle:{
    borderWidth: 1,
    borderColor:'#4E1164',
    margin:10,
    width: 383,
  },

  lineStyle:{
    borderWidth: 1,
    borderColor:'#000000',
    margin:13,
    width: 300,
    alignSelf: 'center',

  },

  qrcode: {
    // qr code placement?
    position: 'absolute',
    right: 35,
    top: 10,
    height: 50,
    width: 50,
  },

  gap: {
    //between the bill name,drinks and amount to split:,$50.00
    marginVertical: 2,
  },

  room: {
    position: 'absolute',
    left: 70,
    top: 30,
    height: 49,
    width: 16,
  },


});
