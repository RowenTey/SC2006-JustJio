import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import RuleCard from '../components/RuleCard.js';
import Rules from '../constants/Rules.js';

const PartyGames = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Party Games</Text>
      </View>

      <View style={styles.middle}>
        <FlatList
          data={Rules}
          renderItem={({ item }) => (
            <RuleCard
              mainRule={item}
              navigation={navigation}
              isStatic={item.isStatic}
            />
          )}
          numColumns={1}
          key={'_'}
          keyExtractor={(item, index) => index}
        />
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
    fontSize: 16,
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

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },
});
