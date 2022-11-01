/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AuthContext } from '../context/auth';
import { AxiosContext } from '../context/axios';
import { UserContext } from '../context/user';
import * as KeyChain from 'react-native-keychain';
import Spinner from '../components/Spinner';
import CustomInput from '../components/CustomInput';
import CustomModal from '../components/CustomModal';

const initialLoginState = {
  username: '',
  password: '',
};

const Signin = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialLoginState });
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    showModal: false,
    title: '',
    message: '',
  });

  const onLogin = async formData => {
    setLoading(true);
    try {
      console.log('Login data', formData);
      const { data: response } = await publicAxios.post('/auth', formData);
      const { token } = response;
      authContext.setAuthState({
        accessToken: token,
        authenticated: true,
      });

      await KeyChain.setGenericPassword(
        'token',
        JSON.stringify({
          token,
        }),
      );

      console.log('Logged in', response.data);
      setUser(response.data);
      reset(initialLoginState);
      setLoading(false);
      navigation.navigate('HomeTab');
    } catch (error) {
      setTimeout(() => setLoading(false), 500);
      console.log('Login failed', error);
      if (error.response) {
        console.log('Error response', error.response.data);
        if (error.response.data.message) {
          setModalState(prev => {
            return {
              ...prev,
              title: 'Login failed!',
              message: error.response.data.message,
              showModal: true,
            };
          });
        } else {
          setModalState(prev => {
            return {
              ...prev,
              title: 'Login failed!',
              message: 'An unforeseen error occurred',
              showModal: true,
            };
          });
        }
      } else if (error?.request) {
        console.log('Error request', error?.request);
      }
    }
  };

  const onSignup = () => {
    navigation.navigate('Signup');
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <CustomModal
        title={modalState.title}
        message={modalState.message}
        modalVisible={modalState.showModal}
        closeModal={onCloseModal}
        type="error"
      />

      {!modalState.showModal && (
        <>
          <TextInput style={styles.text}>JustJio</TextInput>

          <CustomInput
            placeholder={'Enter your username'}
            placeholderTextColor="#4E1164"
            name="username"
            rules={{ required: 'Username is required' }}
            control={control}
            textStyles={styles.inputText}
          />
          <CustomInput
            placeholder={'Enter your password'}
            placeholderTextColor="#4E1164"
            name="password"
            rules={{ required: 'Password is required' }}
            control={control}
            secureTextEntry={true}
            textStyles={styles.inputText}
          />

          <TouchableOpacity>
            <Text
              style={styles.confirmationBox}
              onPress={handleSubmit(onLogin)}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.miniBold}>Forgot password</Text>
          </TouchableOpacity>

          <View style={styles.smallText}>
            <Text style={styles.signup}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupLink} onPress={onSignup}>
                {' '}
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

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
    bottom: -110,
  },

  inputText: {
    color: '#6C6C6B',
    fontFamily: 'Poppins',
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
    bottom: -90,
  },

  signup: {
    color: '#4E1164',
    fontsize: 16,
    fontweight: '500',
  },

  signupLink: {
    color: '#4E1164',
    fontsize: 16,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },

  miniBold: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
    fontWeight: 'bold',
    bottom: -100,
  },
});
