import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';

const SpinTheWheel = ({ navigation }) => {
  const wheelRef = useRef(null);
  const participants = [
    'ks',
    'zh',
    'amabel',
    'harish',
    'eldrick',
    'aloysius',
    'jeff',
  ];

  const handleWinner = (value, index) => {
    Alert.alert(value + ' Won!', value + ' is the lucky winner!');
  };

  const wheelOptions = {
    rewards: participants,
    knobSize: 35,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    knobSource: require('../../assets/images/knob.png'),
    textAngle: 'horizontal',
    onRef: ref => (wheelRef.current = ref),
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Spin The Wheel</Text>
      </View>

      <View style={styles.middle}>
        <WheelOfFortune options={wheelOptions} getWinner={handleWinner} />
        <TouchableOpacity
          style={styles.spinWheelButton}
          onPress={() => {
            wheelRef.current._tryAgain();
          }}>
          <Text style={styles.spinWheelText}>Spin!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpinTheWheel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
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
    justifyContent: 'space-between',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
    paddingHorizontal: 20,
  },

  back: {
    position: 'relative',
    top: 4,
    justifyContent: 'flex-start',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ecec',
    paddingHorizontal: 15,
    width: 500,
    minHeight: '91%',
    maxHeight: '91%',
  },

  spinWheelButton: {
    marginBottom: 40,
    backgroundColor: '#4E1164',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
  },

  spinWheelText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
});
