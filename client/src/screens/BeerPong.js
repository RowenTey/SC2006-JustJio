import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const BeerPong = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Beer Pong</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.image}>
          <Image
            style={styles.gameImage}
            source={{
              width: 240,
              height: 120,
              uri: 'https://s.hdnux.com/photos/01/25/42/54/22424372/4/ratio3x2_1200.jpg',
            }}
          />
        </View>

        <ScrollView style={styles.rulesContainer}>
            <Text style={styles.rulesText}>
            Another absolute classic. Beer Pong involves attempting to throw a ping pong ball into your 
            opposition's cup, resulting in them drinking the contents. At either ends of a kitchen table 
            / counter top/ ping pong table, put six cups in a triangle shape. In teams, take it in turns 
            to throw the ball into your opposition's cups from your end, being sure to be transparent with 
            your rules from the beginning. Is the ball allowed to bounce? Are you allowed to hit the rim? 
            The winning team is the one who lands the ball in all of the opposition's cups before they do 
            it to you.
            </Text>
        </ScrollView>

      </View>
    </View>
  );
};

export default BeerPong;

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
