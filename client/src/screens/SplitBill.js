/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import CustomInput from '../components/CustomInput';
import CustomModal from '../components/CustomModal';
import { UserContext } from '../context/user';
import { TransactionContext } from '../context/transaction';

var billData = {
  billname: '',
  amount: '',
};

const initialState = {
  ...billData,
};

const SplitBill = ({ navigation, route }) => {
  const { payers, room } = route.params;
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({ initialState });
  const { createTransactions } = useContext(TransactionContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    showModal: false,
    title: '',
    message: '',
  });

  const calcAmountToPay = amount => {
    return (amount / payers.length).toFixed(2);
  };

  const onSplitBill = async formData => {
    setLoading(true);
    let { billName, amount } = formData;
    let curDate = new Date();

    billData = {
      name: billName,
      amountToPay: parseFloat(calcAmountToPay(amount)),
      roomId: room.ID.toString(),
      shouldPay: user.username,
      date: curDate.toDateString(),
      payers,
    };

    try {
      console.log('Split Bill Data', billData);
      await createTransactions(billData, room.ID);
      setLoading(false);
      setModalState(prev => {
        return {
          ...prev,
          title: 'Yay',
          message: 'Bill splitted successfully',
          showModal: true,
        };
      });
    } catch (error) {
      setLoading(false);
      console.log('Failed to create transactions', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
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
    navigation.navigate('HomeTab');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.containerMain}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Split Bill</Text>
      </View>

      <CustomModal
        title={modalState.title}
        message={modalState.message}
        modalVisible={modalState.showModal}
        closeModal={onCloseModal}
        type="success"
      />

      {!modalState.showModal && (
        <View style={styles.middle}>
          <View style={styles.billTop}>
            <Text style={styles.billTopText}>Bill for:</Text>
            <Text style={styles.billRoomName}>{room.name}</Text>
          </View>
          <View style={styles.topLineStyle} />

          <View style={styles.form}>
            <Text style={styles.billText}>Bill name: </Text>
            <CustomInput
              placeholder={''}
              placeholderTextColor="#4E1164"
              name="billName"
              rules={{ required: 'Bill name is required' }}
              control={control}
              textStyles={styles.input}
            />

            <Text style={styles.billText}>Amount to split: </Text>
            <CustomInput
              placeholder={''}
              placeholderTextColor="#4E1164"
              name="amount"
              rules={{
                required: 'Amount is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please enter a number',
                },
              }}
              control={control}
              textStyles={styles.input}
            />
          </View>

          <View style={styles.confirm}>
            <TouchableOpacity onPress={handleSubmit(onSplitBill)}>
              <Text style={styles.buttonText}>Split Bill</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SplitBill;

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#E9D7FD',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: 80,
    flexDirection: 'row',
  },

  middle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0ecec',
    height: 250,
    top: 10,
  },

  containerMain: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
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

  back: {
    position: 'absolute',
    top: -1,
    right: 90,
  },

  form: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '12%',
  },

  billText: {
    fontSize: 20,
    top: 10,
    fontFamily: 'Poppins',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: '#4E1164',
    marginVertical: 8,
  },

  input: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  billTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },

  billTopText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },

  billRoomName: {
    marginLeft: 10,
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#4E1164',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 2,
  },

  topLineStyle: {
    borderWidth: 1,
    borderColor: '#4E1164',
    marginVertical: 10,
    width: 500,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    marginLeft: 45,
    width: 300,
    alignSelf: 'center',
  },

  qrcode: {
    position: 'absolute',
    right: 35,
    top: 10,
    height: 50,
    width: 50,
  },

  gap: {
    marginVertical: 2,
  },

  room: {
    position: 'absolute',
    left: 70,
    top: 30,
    height: 49,
    width: 16,
  },

  confirm: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '45%',
    minHeight: '9%',
    maxHeight: '9%',
    position: 'relative',
    top: 25,
    backgroundColor: '#4E1164',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    margin: 15,
  },
});
