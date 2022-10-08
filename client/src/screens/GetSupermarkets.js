import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GetSupermarkets = () => {

    const [ places, setPlaces ] = React.useState({
		placesArray: [],
	})

    const [location, setLocation] = React.useState({
        latitude: 1.293470,
        longitude: 103.803700,
    })

    fetchNearestPlacesFromGoogle = () => {
        console.log("Rlat:" + location.latitude);
        console.log("Rlong:"+location.longitude);
        let latitude = location.latitude; 
        let longitude = location.longitude;
        let radMetter = 2 * 1000; // Search withing 2 KM radius
        const type = 'supermarket';
        const key = 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4';
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
        const getSupermarketsUrl = url + 'location=' + latitude + ',' + longitude + '&radius=' + 
        radMetter + '&keyword=' + type + '&key=' + key;

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
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails = {true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log("Glat:" + details.geometry.location.lat);
                    console.log("Glong:"+details.geometry.location.lng);
                    setLocation({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
					})
                }}
                query={{
                    key: 'AIzaSyB6RtFpoPVa3mhGtfkTwf04wtOkNxCvq-4',
                    language: 'en',
                    components: 'country:sg',
                }}

                styles={{
					container: { flex: 0, width: "100%", zIndex: 1, backgroundColor: "gray"},
					listView: { backgroundColor: "white" }
				}}
            />

            <FlatList 
                data={places.placesArray.results}
                style={{flex: 1, backgroundColor: 'grey', width: '80%', margin: 60, padding: 5}} 
                keyExtractor={(item) => item.place_id}
                renderItem={({item}) => (
                    <Text>{item.name}</Text>
                )} 
                
                />

            <TouchableOpacity onPress={() => fetchNearestPlacesFromGoogle()}>
                <Text style={{backgroundColor: 'grey', color: 'white', padding: 20, marginBottom: 50}}>Find Snacks</Text>
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
});