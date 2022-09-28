import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={'#4E1164'}
              style={[styles.box,{borderColor : error ? 'red' : 'white'}] }
              secureTextEntry={secureTextEntry}
            />
            {error &&  (<Text style = {{color : 'red', alignSelf : 'auto'}}>{error.message || 'error'}</Text>)}
        </>
      )}

    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
  },

  box: {
    width: 300,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginVertical: 10,
    color: '#6C6C6B',
    fontSize: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
  },

  input: {},
});

export default CustomInput;