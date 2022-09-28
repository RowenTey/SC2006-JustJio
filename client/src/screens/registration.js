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
import CustomInput from '../components/CustomInput';

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
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const ALPHA_NUMERIC =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const {
    control,
    handleSubmit,
    formState: {},
    watch,
  } = useForm({ initialState });
  const { publicAxios } = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);
  const password = watch('Password');

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
      navigation.navigate('Signin');
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
    navigation.navigate('Signin');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JustJio</Text>

      <CustomInput placeholder={"Enter your Username"} name = "username" rules={{ required: 'Username is required' }} control = {control} />


      <CustomInput placeholder={"Enter your Phone number"} name = "phonenumber" rules={{ required: 'Phonenumber is required' }} control = {control} />  


      <CustomInput placeholder={"Enter your Email"} name = "email" rules={{ required: 'Email ID is required' , pattern : {value : EMAIL_REGEX , message : "This is an invalid email ID"}}} control = {control} />


      <CustomInput placeholder={"Enter your Password"} name = "Password"  control = {control} secureTextEntry ={true} 
      rules = {{required : 'Password is required', minLength : {value : 8 , message : "Password should be minimum of 8 characters"}, pattern : {value : ALPHA_NUMERIC , message : "Password has to contain letters, numbers & symbols "}}}
      />


      <CustomInput placeholder={"Confirm your Pasword"} name = "ConfirmPassword"  rules={{
            validate: value => value === password || 'Passwords do not match',
          }} control = {control} secureTextEntry ={true}/>


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
