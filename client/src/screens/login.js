/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Signin = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // Function for backend to check if data is right then approve :)
  const onLogin = data => {
    console.warn('Signing in');
    // Use the data to check
    console.log(data);
    navigation.navigate('home');
  };

  // console.log(errors);
  const onSignup = () => {
    console.warn('Signup page');
    navigation.navigate('signup');
  };

  return (
    <View style={Styles.container}>
      <TextInput style={Styles.text}>JustJio</TextInput>

      <Controller
        control={control}
        name="Username"
        rules={{required: true}}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <TextInput
            style={[Styles.box, {borderColor: error ? 'red' : 'white'}]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter your username"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={false}
          />
        )}
      />

      <Controller
        control={control}
        name="Password"
        rules={{required: true}}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <TextInput
            style={[Styles.box, {borderColor: error ? 'red' : 'white'}]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter your password"
            placeholderTextColor={'#4E1164'}
            secureTextEntry={true}
          />
        )}
      />

      <TouchableOpacity>
        <Text style={Styles.confirmationbox} onPress={onLogin}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={Styles.minibold}>Forgot password</Text>
      </TouchableOpacity>

      <View style={Styles.smalltext}>
        <Text style={Styles.signup}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={Styles.signupLink} onPress={onSignup}>
            {' '}
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;

const Styles = StyleSheet.create({
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

  smalltext: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
    bottom: -110,
  },

  box: {
    width: 300,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginVertical: 20,
    color: '#6C6C6B',
    fontSize: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
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
    fontweight: '500',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },

  minibold: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
    fontWeight: 'bold',
    bottom: -100,
  },
});
