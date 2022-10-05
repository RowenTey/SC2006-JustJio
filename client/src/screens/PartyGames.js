import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const PartyGames = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Party Games</Text>
      </View>
      <ScrollView style={styles.middle}>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://s.hdnux.com/photos/01/25/42/54/22424372/4/ratio3x2_1200.jpg',
            }}
          />
          <Text style={styles.gameText}>Beer Pong</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.brightful.me/content/images/size/w2000/2020/09/shutterstock_1400121068.jpg',
            }}
          />
          <Text style={styles.gameText}>Charades</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            resizeMode="stretch"
            source={{
              width: 92,
              height: 67,
              uri: 'https://cdn.appuals.com/wp-content/uploads/2021/10/intro-1.jpg',
            }}
          />
          <Text style={styles.gameText}>Cards Against Humanity</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.lovehkfilm.com/reviews_2/ab5734/bet_to_basic_a.jpg',
            }}
          />
          <Text style={styles.gameText}>Mahjong</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://i.ytimg.com/vi/Qm5-zohOKFc/maxresdefault.jpg',
            }}
          />
          <Text style={styles.gameText}>Heads Up</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.todayville.com/wp-content/uploads/2021/12/tvrd-tvrd-dow-woke-musical-chairs-image-2021-12-16.jpg',
            }}
          />
          <Text style={styles.gameText}>Musical Chairs</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.todayville.com/wp-content/uploads/2021/12/tvrd-tvrd-dow-woke-musical-chairs-image-2021-12-16.jpg',
            }}
          />
          <Text style={styles.gameText}>Musical Chairs</Text>
        </View>
        <View style={styles.gameContainer}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.todayville.com/wp-content/uploads/2021/12/tvrd-tvrd-dow-woke-musical-chairs-image-2021-12-16.jpg',
            }}
          />
          <Text style={styles.gameText}>Musical Chairs</Text>
        </View>
        <View style={styles.gameContainerLast}>
          <Image
            style={styles.gameImage}
            source={{
              width: 92,
              height: 67,
              uri: 'https://www.todayville.com/wp-content/uploads/2021/12/tvrd-tvrd-dow-woke-musical-chairs-image-2021-12-16.jpg',
            }}
          />
          <Text style={styles.gameText}>Musical Chairs</Text>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Text style={styles.smallText}>Nav Bar</Text>
      </View>
    </View>
  );
};

export default PartyGames;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
  },

  date: {
    fontSize: 15,
    left: 3,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },

  gameContainer: {
    marginHorizontal: 75,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
  },

  gameContainerLast: {
    marginHorizontal: 75,
    marginVertical: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
  },

  gameImage: {
    margin: 8,
    borderRadius: 10,
  },

  gameText: {
    color: '#4E1164',
    marginLeft: 2,
  },

  header: {
    fontSize: 25,
    top: 10,
    fontFamily: 'OleoScript-Bold',
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
    minHeight: '10%',
    maxHeight: '10%',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '83%',
    maxHeight: '83%',
  },

  bottom: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '7%',
    maxHeight: '7%',
  },

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },
});
