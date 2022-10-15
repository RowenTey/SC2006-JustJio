import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GetSupermarkets = () => {

  const [ places, setPlaces ] = React.useState({
		placesArray: [],
	})

  const [location, setLocation] = React.useState({
      latitude: 0,
      longitude: 0,
      locationName: "none",
  })

  fetchNearestPlacesFromGoogle = () => {
      let latitude = location.latitude; 
      let longitude = location.longitude;
      let radMetter = 2 * 1000; // Search withing 2 KM radius
      const order = 'distance';
      const keyword = 'supermarket';
      const types = ['supermarket']
      const key = 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4';
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
      const getSupermarketsUrl = url + 'location=' + latitude + ',' + longitude +
      '&keyword=' + keyword + '&rankby=' + order + '&key=' + key;
      // const getSupermarketsUrl = url + 'location=' + latitude + ',' + longitude + '&radius=' + 
      // radMetter + '&keyword=' + keyword + '&key=' + key + '&rankby=' + order;
      console.log(getSupermarketsUrl);
      fetch(getSupermarketsUrl)
        .then(res => {
          return res.json()
        })
        .then(result => setPlaces({
          placesArray: result
        }))
        .catch(error => {
          console.log(error);
        });
    }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.bigText}>Party Snacks</Text>
        <Text style={{ textAlign: 'center', flexWrap: 'wrap', width: 350, color: '#4E1164', fontWeight: '400', }}>
            Current location: {location.locationName}
        </Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails = {true}
        onPress={(data, details = null) => {
          // console.log("Glat:" + details.geometry.location.lat);
          // console.log("Glong:"+details.geometry.location.lng);
          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            locationName: details.formatted_address,
          })
          fetchNearestPlacesFromGoogle()
        }}
        query={{
            key: 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4',
            language: 'en',
            components: 'country:sg',
        }}
        styles={{
          container: { flex: 0, width: "90%", zIndex: 1, marginTop: 10},
          listView: { backgroundColor: "white", }
        }}
      />

      <FlatList 
        data={places.placesArray.results}
        style={{ flex: 1, width: '100%',}} 
        contentContainerStyle = {{alignItems: 'center'}}
        keyExtractor={(item) => item.place_id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.box}>
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
            </View>
          </TouchableOpacity>
        )} 
      />

    </View>
  );
};

export default GetSupermarkets;

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
    width: 200
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