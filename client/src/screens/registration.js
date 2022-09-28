/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AxiosContext } from '../context/axios';
import Spinner from '../components/Spinner';

var signUpData = {
  username: '',
  phoneNum: '',
  email: '',
  password: '',
};

const initialState = {
  ...signUpData,
  confirmPassword: '',
};

const Signup = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({ initialState });
  const { publicAxios } = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);

  const onSignup = async formData => {
    setLoading(true);
    const { username, phoneNum, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      console.warn('Passwords do not match!');
      return;
    }

    signUpData = {
      username,
      phoneNum,
      email,
      password,
    };
    console.warn('Signing up');
    try {
      console.log('Signup data', formData);
      const response = await publicAxios.post('/auth/signup', signUpData);

      console.log('Signed up', response.data);
      setLoading(false);
      navigation.navigate('signin');
    } catch (error) {
      setLoading(false);
      console.log('Signup failed', error);
      if (error.response) {
        console.log('Error response', error.response.data);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const onSignIn = () => {
    console.warn('Signin page');
    navigation.navigate('signin');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JustJio</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            style={[styles.box, { borderColor: error ? 'red' : 'white' }]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter your username"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={false}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNum"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            style={[styles.box, { borderColor: error ? 'red' : 'white' }]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter your phone number"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={false}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            style={[styles.box, { borderColor: error ? 'red' : 'white' }]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter your email"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={false}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            style={[styles.box, { borderColor: error ? 'red' : 'white' }]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter your password"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={true}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            style={[styles.box, { borderColor: error ? 'red' : 'white' }]}
            value={value}
            onChangeText={onChange}
            placeholder="Confirm password"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={true}
          />
        )}
      />

      <TouchableOpacity>
        <Text style={styles.confirmationbox} onPress={handleSubmit(onSignup)}>
          Register
        </Text>
      </TouchableOpacity>

      <View style={styles.smalltext}>
        <Text style={styles.smalltext}>Already have an account?</Text>
        <Text style={styles.signin} onPress={onSignIn}>
          {' '}
          Sign in
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  text: {
    fontSize: 56,
    top: -40,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },

  smalltext: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },

  box: {
    width: 300,
    backgroundColor: 'white',
    marginVertical: 10,
    color: '#6C6C6B',
    fontSize: 13,
    paddingHorizontal: 16,
  },

  confirmationbox: {
    borderRadius: 25,
    width: 300,
    height: 40,
    paddingVertical: 10,
    backgroundColor: '#4E1164',
    marginVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    alignItems: 'center',
    textAlign: 'center',
  },

  signin: {
    color: '#4E1164',
    fontsize: 16,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
