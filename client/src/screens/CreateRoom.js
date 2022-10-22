import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import CustomInput from '../components/CustomInput';
import { RoomContext } from '../context/room';
//for images being imported in no need to specify dimensions
//for images online need to specify dimensions such as width: height: uri:(image url)

const initialCreateRoomState = {
  eventName: '',
  date: '',
  time: '',
  venue: '',
  invitees: '',
};

const CreateRoom = ({ navigation }) => {
  //still need to define logic of ensuring have event name, date , time and venu
  const DATE_REGEX =
    /^([1-9]|0[1-9]|[12][0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/\d{4}$/;
  const TIME_REGEX = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ initialCreateRoomState });
  const { createRoom } = useContext(RoomContext);
  const [loading, setLoading] = useState(false);

  const onCreateRoom = async formData => {
    setLoading(true);

    try {
      let { eventName, date, time, venue, invitees } = formData;
      invitees = invitees.split(',');
      let [day, month, year] = date.split('/');
      let currentDate = new Date();
      let dateObj = new Date(`${year}-${month}-${day}`);

      if (currentDate > dateObj) {
        throw new Error('Date entered has passed');
      }

      let roomData = {
        room: {
          name: eventName,
          date,
          time,
          venue,
        },
        invitees,
      };

      await createRoom(roomData).catch(error => {
        throw error;
      });
      setLoading(false);
      reset(initialCreateRoomState);
      Alert.alert('Room created successfully');
      navigation.navigate('HomeTab');
    } catch (error) {
      setLoading(false);
      console.log('Error creating room', error.message);
      switch (error.message) {
        case "User doesn't exist":
          setError('invitees', {
            type: 'string',
            message: 'Username entered is not valid!',
          });
          break;
        case 'Date entered has passed':
          setError('date', {
            type: 'string',
            message: 'Date entered has passed',
          });
          break;
        default:
          break;
      }
    }
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
          rules={{
            required: 'Event name is required',
            minLength: {
              value: 5,
              message: 'Should be minimum of 5 characters',
            },
          }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Date: dd/mm/yyyy'}
          placeholderTextColor="#000"
          name="date"
          rules={{
            required: 'Date is required',
            pattern: {
              value: DATE_REGEX,
              message: 'Invalid date',
            },
          }}
          control={control}
          textStyles={styles.roomText}
        />

        <CustomInput
          placeholder={'Time: 08:00pm'}
          placeholderTextColor="#000"
          name="time"
          rules={{
            required: 'Time is required',
            pattern: {
              value: TIME_REGEX,
              message: 'Invalid time',
            },
          }}
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
          placeholder={'Invitees: (username1,username2)'}
          placeholderTextColor="#000"
          name="invitees"
          rules={{ required: 'Invitee is required' }}
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
    position: 'absolute',
    top: -1,
    right: 65,
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
