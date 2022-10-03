import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AxiosContext } from '../context/axios';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import CustomInput from '../components/CustomInput';
//for images being imported in no need to specify dimensions
//for images online need to specify dimensions such as width: height: uri:(image url)

var roomData = {
  eventName: '',
  date: '',
  time: '',
  venue: '',
  invitees: '',
};

const initialState = {
  ...roomData,
};

const CreateRoom = ({ navigation }) => {
  //still need to define logic of ensuring have event name, date , time and venu

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({ initialState });

  const { authAxios } = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);

  const onCreateRoom = async formData => {
    setLoading(true);
    const { eventName, date, time, venue } = formData;

    roomData = {
      name: eventName,
      date,
      time,
      venue,
    };

    try {
      console.log('Room data', formData);
      const response = await authAxios.post('/auth/createroom', roomData);
      console.log('Create Room Successful', response.data);
      setLoading(false);
      navigation.navigate('Room');
    } catch (error) {
      setLoading(false);
      console.log('Create Room failed', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const successCreateRoom = () => {
    // console.warn('Room page');
    navigation.navigate('Room');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Create Room</Text>
      </View>

      <CustomInput
        placeholder={'Name of Event:'}
        name="eventName"
        rules={{ required: 'Event name is required' }}
        control={control}
      />

      <CustomInput
        placeholder={'Date: dd/mm/yyyy'}
        name="date"
        rules={{ required: 'Date is required' }}
        control={control}
      />

      <CustomInput
        placeholder={'Time:'}
        name="time"
        rules={{ required: 'Time is required' }}
        control={control}
      />

      <CustomInput
        placeholder={'Venue: '}
        name="venue"
        rules={{ required: 'Venue is required' }}
        control={control}
      />

      <CustomInput
        placeholder={'Invitees: usernames '}
        name="invitees"
        control={control}
      />

      <TouchableOpacity>
        <Text
          style={styles.confirmationbox}
          onPress={handleSubmit(onCreateRoom)}>
          Create Room
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  title: {
    // top of the content
    backgroundColor: '#E9D7FD',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: 80,
    flexDirection: 'row',
  },

  container: {
    // the background colour of the entire application
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  box: {
    //white boxes to key in the event details
    width: 300,
    backgroundColor: 'white',
    color: '#6C6C6B',
    fontSize: 13,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  header: {
    // text details of the text
    fontSize: 25,
    top: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  roomText: {
    // text that is written in the boxes
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  // change the text to grey in the same line
  highlightGrey: {
    color: 'grey',
  },

  confirmationBox: {
    borderRadius: 25,
    width: 180,
    height: 35,
    paddingVertical: 5,
    backgroundColor: '#E9D7FD',
    marginVertical: 10,
    color: '#4E1164',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    bottom: -10,
  },
});
