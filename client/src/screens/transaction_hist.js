import React, { Component } from 'react';

import Signin from './login';  

import type {Node} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
  
  } from 'react-native';

  export default class Trans extends Component<{}> {
    render(){
      list1 = [['ammaeudos', '2342', true], ['dobin', '45', false]]
      list2 = [['ammaeudos', '2342', true], ['dobin', '45', false]]
        return(
            <View style = {Styles.container}>

              <View style = {Styles.top}>
                <Text style = {Styles.header}>Transaction History</Text>
              </View>
              <View style = {Styles.middle}> 
                <Transaction_list date = '28 aug' list = {list1}/>
                <Transaction_list date = '27 aug' list = {list2}/>
                
              </View>
              
              <View style = {Styles.bottom}>
                <Text style = {Styles.smalltext}>Nav Bar</Text>
              </View>
              

  
            </View>
        )
    }
  }

  function Transaction_list (props){
    props.date
    props.list
      return(
        <View>
          <Text style = {Styles.date}>{props.date}</Text> 
          <View>
            {
              props.list.map(
                (listItem) => (
                  <Transaction_box 
                  name = {listItem[0]} 
                  amount = {listItem[1]} 
                  isReceive = {listItem[2]}/>
                )
              )
            }
          </View>
        </View>
      )
    }
  

  function Transaction_box (props) {
      props.name
      props.amount
      props.isReceive
      let styleSheet = ''
      if (props.isReceive){
        styleSheet = Styles.amountReceive
      } else {
        styleSheet = Styles.amountGive
      }

      return(
        <View>
              <View style = {Styles.oneDate}>
                <Text style = {Styles.name}>{props.name}</Text>
                <Text style = {styleSheet}>{props.amount}</Text>
              </View>
        </View>
      )
    }
  
  

  

  const Styles = StyleSheet.create({
    header: {
      fontSize : 25 ,
      top : 10,
      fontFamily : "OleoScript-Bold",
      alignItems : 'center',
      justifyContent : 'center',
      color : '#4E1164'
  
    },
  
    head : {
      backgroundColor : '#E9D7FD',
    },
  
    container : {
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#E9D7FD',
      height : '100%',
    },

    

    top : {
      flex : 1,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#E9D7FD',
      minHeight : '10%',
      maxHeight : '10%',
    },

    middle : {
      flex : 2,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#f0ecec',
      width : 500,
      minHeight : '83%',
      maxHeight : '83%',
    },

    bottom : {
      flex : 3,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#E9D7FD',
      minHeight : '7%',
      maxHeight : '7%',
    },

    oneDate : {
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#E9D7FD',
      width :  370,
      height : 80,
      backgroundColor : '#FFFFFF',
      borderRadius: 15,
    },
  
    date: {
      fontSize : 15,
      left : 3,
      fontFamily : "OleoScript-Bold",
      color : "#4E1164",
      
    },

    name: {
      fontSize : 20,
      top: -5,
      left : -110,
      color : "#000000",
    },

    amountReceive: {
      fontSize : 20,
      top: 12,
      left : 140,
      color : "#00FF00",
    },

    amountGive: {
      fontSize : 20,
      top: 12,
      left : 140,
      color : "#FF0000",
    },

    smalltext : {
      fontSize : 13,
      color : "#4E1164",
      flexDirection : 'row',
      

    },

    
    

  
    

    

  });
