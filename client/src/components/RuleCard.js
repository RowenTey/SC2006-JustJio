import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const RuleCard = ({ navigation, mainRule, isStatic }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.ruleCard}
        onPress={() => {
          if (!isStatic) {
            navigation.navigate(mainRule.shouldNavigate);
          } else {
            navigation.navigate('PartyGamesRules', { rule: mainRule });
          }
        }}>
        <Image
          style={styles.gameImage}
          source={{
            width: 120,
            height: 80,
            uri: mainRule.imageURL,
          }}
        />
        <Text style={styles.ruleCardText}>{mainRule.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RuleCard;

const styles = StyleSheet.create({
  ruleCard: {
    marginHorizontal: 75,
    marginVertical: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
  },

  ruleCardText: {
    color: '#4E1164',
    marginLeft: 2,
    fontSize: 16,
  },

  gameImage: {
    margin: 8,
    borderRadius: 10,
  },
});
