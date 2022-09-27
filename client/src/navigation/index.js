import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
  } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Signup from '../screens/registration';
import {Signin} from '../screens/login';
import Home from '../screens/homescreen';



  const Navigation = () =>{
    const Stack = createNativeStackNavigator();


    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='signin' component={Signin}>

            </Stack.Screen>


          </Stack.Navigator>

        </NavigationContainer>




    )
      

    

      

    }


  export default Navigation;