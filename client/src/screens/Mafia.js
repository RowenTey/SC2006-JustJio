import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const IMAGES = {
    mafia: require('../../assets/images/mafia.png'),
  };

const Mafia = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Mafia</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.image}>
          <Image
            source={IMAGES.mafia}
            style={{
              width: 240,
              height: 120,
            }}
          />
        </View>

        <ScrollView style={styles.rulesContainer}>
            <Text style={styles.rulesText}>
            This game is also known as Assassin, Werewolf, or Village. If you have a 
            large group, a deck of cards, a lot of time, and long attention spans, 
            this intense puzzle of a game is a lot of fun, if a little complicated. 
            See the full rules for Mafia; essentially, certain members of the group 
            are the bad guys (the mafia, assassins, etc.); others are villagers, and 
            still more are police officers. One is the game moderator. The police 
            officers are trying to guess who the bad guys are before they can kill all 
            the villagers.
            </Text>
        </ScrollView>

      </View>
    </View>
  );
};

export default Mafia;

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
    position: 'relative',
    justifyContent: 'flex-start',
    top: 6,
    right: 130,
  },
});
