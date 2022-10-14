/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GetSupermarkets = () => {
  const [places, setPlaces] = useState({
    placesArray: [],
  });

  const [location, setLocation] = useState({
    latitude: 1.29347,
    longitude: 103.8037,
  });

  const fetchNearestPlacesFromGoogle = () => {
    console.log('Rlat:' + location.latitude);
    console.log('Rlong:' + location.longitude);
    let latitude = location.latitude;
    let longitude = location.longitude;
    // Search within 2 KM radius
    let radMetter = 2 * 1000;
    const type = 'supermarket';
    const key = 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4';
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const getSupermarketsUrl =
      url +
      'location=' +
      latitude +
      ',' +
      longitude +
      '&radius=' +
      radMetter +
      '&keyword=' +
      type +
      '&key=' +
      key;

    fetch(getSupermarketsUrl)
      .then(res => {
        return res.json();
      })
      .then(result =>
        setPlaces({
          placesArray: result,
        }),
      )
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.bigText}>Party Snacks</Text>
        <GooglePlacesAutocomplete
          placeholder="Current location:"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log('Glat:' + details.geometry.location.lat);
            console.log('Glong:' + details.geometry.location.lng);
            setLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4',
            language: 'en',
            components: 'country:sg',
          }}
          styles={{
            container: {
              flex: 0,
              width: '80%',
            },
            listView: { backgroundColor: 'white' },
          }}
        />
      </View>

      <FlatList
        data={places.placesArray.results}
        style={{
          flex: 1,
          backgroundColor: '#EEEEEE',
          width: '80%',
          margin: 60,
          padding: 5,
        }}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <TouchableOpacity onPress={() => fetchNearestPlacesFromGoogle()}>
        <Text
          style={{
            backgroundColor: '#E9D7FD',
            color: '#4E1164',
            fontWeight: '600',
            padding: 15,
            marginBottom: 50,
            borderRadius: 10,
          }}>
          Find Snacks
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetSupermarkets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  top: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
    paddingVertical: 20,
  },

  bigText: {
    color: '#4E1164',
    fontWeight: '800',
    fontSize: 20,
  },

});
