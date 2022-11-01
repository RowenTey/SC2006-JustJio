/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import Spinner from '../components/Spinner';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import CustomModal from '../components/CustomModal';

const SpinTheWheel = ({ navigation }) => {
  const wheelRef = useRef(null);
  const {
    control,
    handleSubmit,
    setError,
    formState: {},
  } = useForm({});
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [modalState, setModalState] = useState({
    showModal: false,
    title: '',
    message: '',
  });
  const colors = ['#75F4F4', '#EDDEA4', '#B8B3E9', '#D999B9', '#FF9B42'];

  const onEnterPlayers = formData => {
    setLoading(true);

    let { players } = formData;
    players = players.split(',');

    if (players.length < 2) {
      setError('players', {
        type: 'string',
        message: 'There must be a minimum of 2 players',
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }

    setParticipants(players);

    setTimeout(() => {
      setModalVisible(!modalVisible);
      setLoading(false);
    }, 500);
  };

  const onCloseModal = () => {
    setModalState(prev => {
      return {
        ...prev,
        title: '',
        message: '',
        showModal: false,
      };
    });
  };

  const handleWinner = (value, index) => {
    setModalState(prev => {
      return {
        ...prev,
        title: value + ' Won!',
        message: value + ' is the lucky winner!',
        showModal: true,
      };
    });
  };

  const wheelOptions = {
    rewards: participants,
    colors: colors,
    knobSize: 35,
    borderWidth: 5,
    borderColor: '#4E1164',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    knobSource: require('../../assets/images/knob.png'),
    textAngle: 'horizontal',
    textColor: '#000',
    onRef: ref => (wheelRef.current = ref),
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.top,
          { justifyContent: !modalVisible ? 'space-between' : 'center' },
        ]}>
        {!modalVisible && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.back}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.header}>Spin The Wheel</Text>
      </View>

      <View style={styles.middle}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            navigation.goBack();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter name of players:</Text>
              <CustomInput
                placeholder={'Players: (username1,username2)'}
                placeholderTextColor="#000"
                name="players"
                rules={{ required: 'Players are required' }}
                control={control}
                textStyles={styles.roomText}
              />
              <View flexDirection="row">
                <Pressable
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={handleSubmit(onEnterPlayers)}>
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <CustomModal
          title={modalState.title}
          message={modalState.message}
          modalVisible={modalState.showModal}
          closeModal={onCloseModal}
          type="success"
        />

        {participants.length > 0 && (
          <>
            <WheelOfFortune options={wheelOptions} getWinner={handleWinner} />
            <TouchableOpacity
              style={styles.spinWheelButton}
              onPress={() => {
                wheelRef.current._tryAgain();
              }}>
              <Text style={styles.spinWheelText}>Spin!</Text>
            </TouchableOpacity>
          </>
        )}
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  modalView: {
    margin: 20,
    width: 350,
    height: 300,
    backgroundColor: '#E9D7FD',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 25,
    width: 140,
    paddingVertical: 5,
    backgroundColor: '#E9D7FD',
    elevation: 2,
    marginTop: 15,
    marginHorizontal: 10,
  },

  buttonConfirm: {
    backgroundColor: '#4E1164',
  },

  buttonClose: {
    backgroundColor: '#f26a6a',
  },

  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },
});
