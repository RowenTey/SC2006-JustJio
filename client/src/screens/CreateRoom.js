import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
      console.log('Room data', roomData);
      const response = await authAxios.post('/rooms', roomData);
      console.log('Room created successfully', response.data);
      setLoading(false);
      // navigation.navigate('Room');
    } catch (error) {
      setLoading(false);
      console.log('Failed to create room', error);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Create Room</Text>
      </View>

      <View style={styles.form}>
        <CustomInput
          placeholder={'Name of Event:'}
          placeholderTextColor="#000"
          name="eventName"
          rules={{ required: 'Event name is required' }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Date: dd/mm/yyyy'}
          placeholderTextColor="#000"
          name="date"
          rules={{ required: 'Date is required' }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Time:'}
          placeholderTextColor="#000"
          name="time"
          rules={{ required: 'Time is required' }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Venue: '}
          placeholderTextColor="#000"
          name="venue"
          rules={{ required: 'Venue is required' }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Invitees: usernames'}
          placeholderTextColor="#000"
          name="invitees"
          control={control}
          textStyles={styles.roomText}
        />
      </View>

      <TouchableOpacity style={styles.confirmationBox}>
        <Text
          style={styles.confirmationText}
          onPress={handleSubmit(onCreateRoom)}>
          Create Room
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoom;

const styles = StyleSheet.create({
  container: {
    // the background colour of the entire application
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },

  title: {
    // top of the content
    backgroundColor: '#E9D7FD',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
  },

  back: {
    // back arrow
    position: 'relative',
    top: 8,
    right: 75,
  },

  header: {
    // text details of the header
    fontSize: 25,
    top: 10,
    fontFamily: 'Poppins-ExtraBold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  form: {
    // form div
    marginTop: 15,
  },

  box: {
    // white boxes to key in the event details
    width: 300,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  roomText: {
    // text that is written in the boxes
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  highlightGrey: {
    // change the text to grey in the same line
    color: 'grey',
  },

  confirmationBox: {
    // button
    borderRadius: 25,
    width: 180,
    height: 35,
    paddingVertical: 5,
    backgroundColor: '#E9D7FD',
    marginVertical: 18,
    alignItems: 'center',
    textAlign: 'center',
  },

  confirmationText: {
    // button text
    color: '#4E1164',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
