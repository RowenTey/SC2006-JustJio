import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const PartyGamesRules = ({ navigation, route }) => {

  const { rule } = route.params;

  console.log('Hello', rule.imageURL); 

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{rule.name}</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.image}>
          <Image
            style={styles.gameImage}
            source={{
              width: 240,
              height: 120,
              uri: rule.imageURL,
            }}
          />
        </View>

        <ScrollView style={styles.rulesContainer}>
            <Text style={styles.rulesText}>
            {rule.description}
            </Text>
        </ScrollView>

      </View>
    </View>
  );
};

export default PartyGamesRules;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
  },

  image: {
    marginHorizontal: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  rulesContainer: {
    marginHorizontal: 80,
    marginVertical: 30,
    minHeight: '55%',
    maxHeight: '55%',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 15,
  },

  rulesText: {
    fontSize: 20,
    textAlign: 'justify',
    color: 'black',
    fontFamily: "Cochin",
    padding: 10,
  },

  gameImage: {
    margin: 8,
    borderRadius: 10,
  },

  header: {
    fontSize: 20,
    top: 8,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '90%',
    maxHeight: '90%',
  },

  back: {
    // back arrow
    position: 'absolute',
    top: -5,
    right: 100,
  },
});
