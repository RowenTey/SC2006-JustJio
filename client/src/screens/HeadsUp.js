import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const HeadsUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Heads Up</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.image}>
          <Image
            style={styles.gameImage}
            source={{
              width: 240,
              height: 120,
              uri: 'https://i.ytimg.com/vi/Qm5-zohOKFc/maxresdefault.jpg',
            }}
          />
        </View>

        <ScrollView style={styles.rulesContainer}>
            <Text style={styles.rulesText}>
            A real crowd pleaser, the Head's Up app makes party games a doddle. Once you've 
            downloaded it, one person picks a category (whether that's Superstars, Act It Out, 
            Animals or more), and puts the phone to their head. The phone will then display words 
            within that category, and the other players on that person's team have to describe 
            the word without actually saying it, within a time limit. Once the person guesses 
            correctly, they nod the phone forward, and it moves on to the next word. The winning 
            team is the one that guesses the most words in the time limit.
            </Text>
        </ScrollView>

      </View>
    </View>
  );
};

export default HeadsUp;

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
    right: 100,
  },
});
