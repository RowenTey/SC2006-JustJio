/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  textStyles,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={[
              styles.box,
              textStyles,
              { borderColor: error ? 'red' : 'white' },
            ]}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins',
                alignSelf: 'auto',
                textAlign: 'center',
                paddingHorizontal: 15,
              }}>
              {error.message || 'error'}
            </Text>
          )}
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
    fontSize: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default CustomInput;
