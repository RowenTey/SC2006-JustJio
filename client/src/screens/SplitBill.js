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

const SplitBillMembers = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Split Bill</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.billtoptext}>Bill for: </Text>

        <Text style={styles.billtext}>Bill Name: </Text>

        <Text style={styles.billtext}>Amount to split: </Text>
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

  billtext: {
    //text details of the text
    fontSize: 20,
    top: 10,
    fontFamily: 'Poppins',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
    marginLeft: 30,
  },

  billtoptext: {
    //text details of the text
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#4E1164',
    marginLeft: 12,
  },
});
