import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const MusicalChairs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Musical Chairs</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.image}>
          <Image
            style={styles.gameImage}
            source={{
              width: 240,
              height: 120,
              uri: 'https://www.todayville.com/wp-content/uploads/2021/12/tvrd-tvrd-dow-woke-musical-chairs-image-2021-12-16.jpg',
            }}
          />
        </View>

        <ScrollView style={styles.rulesContainer}>
            <Text style={styles.rulesText}>
            Okay, it's a popular party game for kids, but adults can also get in 
            on the fun. Set up chairs (or seat cushions) in a circle facing outward, 
            with enough seating for everyone playing, minus one. Designate one person 
            as the music player and have everyone else stand in a circle around the 
            circle of seats. When the music starts, walk around the seats; everyone 
            must find a seat when the music ends. Whoever doesn't is out. Remove one 
            more chair and begin again, until two people are fighting for one seat. 
            To make musical chairs more interesting, add your own rules. Allow people 
            to sit on top of each other (as long as their feet are off the floor), for 
            example, or make your own alterations.
            </Text>
        </ScrollView>

      </View>
    </View>
  );
};

export default MusicalChairs;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
  },

  image: {
    marginHorizontal: 60,
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
    fontSize: 25,
    top: 8,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  top: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '9%',
    maxHeight: '9%',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '91%',
    maxHeight: '91%',
  },
});
