import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AxiosContext } from '../context/axios';
import Spinner from '../components/Spinner';
import CustomInput from '../components/CustomInput';

var signUpData = {
  username: '',
  phoneNum: '',
  email: '',
  password: '',
};

const initialRegistrationState = {
  ...signUpData,
  confirmPassword: '',
};

const Signup = ({ navigation }) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const ALPHA_NUMERIC = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {},
  } = useForm({ initialRegistrationState });
  const { publicAxios } = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);
  const passwordCheck = watch('password');

  const onSignup = async formData => {
    setLoading(true);
    const { username, phoneNum, email, password } = formData;

    signUpData = {
      username,
      phoneNum,
      email,
      password,
    };
    try {
      console.log('Signup data', formData);
      const response = await publicAxios.post('/auth/signup', signUpData);

      console.log('Signed up', response.data);
      setLoading(false);
      navigation.navigate('Signin');
    } catch (error) {
      setLoading(false);
      console.log('Signup failed', error);
      if (error.response) {
        console.log('Error response', error.response.data);
        Alert.alert('Login failed', error.response.data.message, [
          {
            text: 'Retry',
            onPress: () => reset(initialRegistrationState),
            style: 'cancel',
          },
        ]);
      } else if (error.request) {
        console.log('Error request', error.request);
      }
    }
  };

  const onSignIn = () => {
    navigation.navigate('Signin');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JustJio</Text>

      <CustomInput
        placeholder={'Enter your username'}
        placeholderTextColor="#4E1164"
        name="username"
        rules={{ required: 'Username is required' }}
        control={control}
        textStyles={styles.inputText}
      />

      <CustomInput
        placeholder={'Enter your phone number'}
        placeholderTextColor="#4E1164"
        name="phoneNum"
        rules={{ required: 'Phone Number is required' }}
        control={control}
        textStyles={styles.inputText}
      />

      <CustomInput
        placeholder={'Enter your email'}
        placeholderTextColor="#4E1164"
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Invalid email',
          },
        }}
        control={control}
        textStyles={styles.inputText}
      />

      <CustomInput
        placeholder={'Enter your password'}
        placeholderTextColor="#4E1164"
        name="password"
        control={control}
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should be minimum of 8 characters',
          },
          pattern: {
            value: ALPHA_NUMERIC,
            message:
              'Password has to contain upper and lower letters, numbers & symbols',
          },
        }}
        textStyles={styles.inputText}
      />

      <CustomInput
        placeholder={'Confirm your password'}
        placeholderTextColor="#4E1164"
        name="confirmPassword"
        rules={{
          validate: value =>
            value === passwordCheck || 'Passwords do not match',
        }}
        control={control}
        secureTextEntry={true}
        textStyles={styles.inputText}
      />

      <TouchableOpacity>
        <Text style={styles.confirmationBox} onPress={handleSubmit(onSignup)}>
          Register
        </Text>
      </TouchableOpacity>

      <View style={styles.smallText}>
        <Text style={styles.smallText}>Already have an account?</Text>
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

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },

  inputText: {
    color: '#6C6C6B',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
  },

  confirmationBox: {
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
