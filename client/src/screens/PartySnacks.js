import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const PartySnacks = () => {
  return (
    <View style={Styles.container}>

      <View style={Styles.topbar}>
        <Text style={Styles.bigtext}>Party Snacks</Text>
        <Text style={Styles.smalltext}>Current location: Bukit Batok Street 21</Text>
      </View>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>Sheng Shiong Commonwealth</Text>
        <Text style={Styles.details}>5 km</Text>
        <Text style={Styles.details}>$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>Fairprice Stirling Road</Text>
        <Text style={Styles.details}>2.7 km</Text>
        <Text style={Styles.details}>$$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>Fairprice Dawson Road</Text>
        <Text style={Styles.details}>4.9 km</Text>
        <Text style={Styles.details}>$$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>Cold Storage Holland Village</Text>
        <Text style={Styles.details}>3.1 km</Text>
        <Text style={Styles.details}>$$$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>CS Fresh The Star Vista</Text>
        <Text style={Styles.details}>1.4 km</Text>
        <Text style={Styles.details}>$$$</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.box}>
        <Text style={Styles.details}>Sheng Shiong Ghim Moh Link</Text>
        <Text style={Styles.details}>1.2 km</Text>
        <Text style={Styles.details}>$</Text>
      </TouchableOpacity>

      <View style={Styles.bottombar}>
      </View>

    </View>
  );
};

export default PartySnacks;

const Styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    borderRadius: 15,
    width: 340,
    height: 80,
    marginVertical: 5,
  },

  topbar: {
    backgroundColor: "#E9D7FD",
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 20,
    height: 80,
  },

  bottombar: {
    backgroundColor: "#E9D7FD",
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    height: 60,
  },

  details: {
    color: "#4E1164",
    fontWeight: '500',
  },

  bigtext: {
    color: "#4E1164",
    fontWeight: '800',
    fontSize: 20,
  },

  smalltext: {
    color: "#4E1164",
    fontWeight: '400',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    width: "100%",
  },

  images: {
    width: 100,
    height: 100,
  },
});