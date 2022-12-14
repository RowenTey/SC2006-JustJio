/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Spinner from '../components/Spinner';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY);

const PartySnacks = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState({
    placesArray: [],
  });
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    locationName: 'none',
  });

  const fetchNearestPlacesFromGoogle = async (lat, long) => {
    let latitude = lat;
    let longitude = long;
    const order = 'distance';
    const keyword = 'supermarket';
    const key = Config.GOOGLE_MAPS_API_KEY;
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const getSupermarketsUrl =
      url +
      'location=' +
      latitude +
      ',' +
      longitude +
      '&keyword=' +
      keyword +
      '&rankby=' +
      order +
      '&key=' +
      key;

    await fetch(getSupermarketsUrl)
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

  const onSearch = async details => {
    const lat = details.geometry.location.lat;
    const long = details.geometry.location.lng;
    setLocation({
      latitude: lat,
      longitude: long,
      locationName: details.formatted_address,
    });
    await fetchNearestPlacesFromGoogle(lat, long);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    ref.current?.clear();
    Geolocation.getCurrentPosition(async pos => {
      const curLat = pos.coords.latitude;
      const curLng = pos.coords.longitude;
      var addrName;
      await Geocoder.from(curLat, curLng).then(json => {
        var addressComponent = json.results[0].address_components[0];
        var add1 = json.results[0].address_components[1].long_name;
        var add2 = json.results[0].address_components[2].long_name;
        addrName = add1 + ', ' + add2;
      });
      setLoading(true);
      setLocation({
        latitude: curLat,
        longitude: curLng,
        locationName: addrName,
      });
      await fetchNearestPlacesFromGoogle(curLat, curLng);
    });
    setTimeout(() => setLoading(false), 500);
  };

  const openMaps = item => {
    const lati = item.geometry.location.lat;
    const longi = item.geometry.location.lng;
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lati},${longi}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const kmOrMeter = dist => {
    if (dist >= 1000) {
      dist = (dist / 1000).toFixed(2) + 'k';
    }
    return dist;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.bigText}>Party Snacks</Text>
        <Text style={styles.locationText}>
          {' '}
          Current location: {location.locationName}{' '}
        </Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput editable={false} style={styles.searchBarSpacer} />
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details) => onSearch(details)}
          query={{
            key: Config.GOOGLE_MAPS_API_KEY,
            language: 'en',
            components: 'country:sg',
          }}
          styles={{
            container: {
              flex: 0,
              width: 350,
              marginTop: 5,
            },
            listView: {
              backgroundColor: 'white',
            },
            textInputContainer: {
              width: 315,
            },
            textInput: {
              color: '#4E1164',
              fontSize: 12,
              fontFamily: 'Poppins-Bold',
            },
            description: {
              color: '#4E1164',
            },
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 25,
          }}
          onPress={getLocation}>
          <Image
            style={styles.images}
            source={{
              width: 20,
              height: 20,
              uri: 'https://static.thenounproject.com/png/2819186-200.png',
            }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={places.placesArray.results}
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.box} onPress={() => openMaps(item)}>
            <Image
              style={styles.images}
              source={{
                width: 90,
                height: 65,
                uri: 'https://mustsharenews.com/wp-content/uploads/2022/03/sheng-siong.png',
              }}
            />
            <View>
              <Text style={styles.details}>{item.name}</Text>
              <Text style={styles.distanceText}>
                {kmOrMeter(
                  getDistance(
                    {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    },
                    {
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                    },
                  ),
                )}
                m away
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PartySnacks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  topBar: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E9D7FD',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
  },

  locationText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    width: 350,
    color: '#4E1164',
    fontWeight: '400',
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  searchBarSpacer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 44,
    zIndex: 0,
    right: 23,
    width: 40,
    top: 5,
  },

  box: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 75,
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 5,
    width: 350,
  },

  images: {
    margin: 8,
    borderRadius: 10,
  },

  details: {
    color: '#4E1164',
    fontWeight: '500',
    flexWrap: 'wrap',
    width: 200,
  },

  bigText: {
    color: '#4E1164',
    fontWeight: '800',
    fontSize: 20,
  },

  smallText: {
    color: '#4E1164',
    fontWeight: '400',
  },

  distanceText: {
    color: '#4E1164',
    fontWeight: '400',
    fontSize: 12,
  },

  bottombar: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#E9D7FD',
    minHeight: '7%',
    maxHeight: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
