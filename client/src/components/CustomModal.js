/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';

const CustomModal = ({ title, message, type, modalVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              shadowColor: type === 'error' ? '#FF0000' : '#00FF00',
              borderColor: type === 'error' ? '#FF0000' : '#00FF00',
            },
          ]}>
          <Text
            style={[
              styles.modalTitle,
              { color: type === 'error' ? '#FF0000' : '#00FF00' },
            ]}>
            {title}
          </Text>
          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: type === 'error' ? '#FF0000' : '#00FF00' },
            ]}
            onPress={() => closeModal()}>
            <Text style={styles.textStyle}>
              {type === 'error' ? 'Retry' : 'Ok'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  modalView: {
    margin: 20,
    width: 350,
    height: 225,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 3,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 2,
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
    marginTop: 5,
  },

  buttonConfirm: {
    backgroundColor: '#4E1164',
  },

  buttonClose: {
    backgroundColor: '#FF0000',
  },

  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
  },

  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
});
