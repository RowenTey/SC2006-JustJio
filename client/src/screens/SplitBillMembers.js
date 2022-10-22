import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const ICONS = {
  tick: require('../../assets/images/tick.png'),
};

import { Checkbox } from 'react-native-paper';

let greytick = 0; //not selected
let blacktick = 1; //selected
tintColor : 'grey' //use this to transform black to grey when clicking and unclicking

var array = ['amabel123','zh123','ks123'];


const SplitBillMembers = ({ navigation, route }) => {
  const { payees } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Split Bill</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.memberList}>
          <Text style={styles.list}>List of Payers:</Text>
          <GuestList list={payees} />
        </View>
        <TouchableOpacity
          style={styles.confirm}
          onPress={() => navigation.navigate('SplitBill' , {payees : array })}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GuestList = props => {
  const renderItem = ({ item }) => <Box name={item} />;
  return (
    <View style={styles.memberBox}>
      <FlatList
        data={props.list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const Box = props => {
  const [check, setcheck] = React.useState(false);
  return (
    <View style={styles.indName}>
      <Image
        source={{
          width: 35,
          height: 35,
          uri: 'https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg',
        }}
      />
      <Image source={ICONS.tick} 
      style={{
      width: 26,
      height: 26,
      position: 'absolute',
      top: 14,
      right: 20,
      }}
      />
      <Pressable onPress={() => setcheck(!check)}>
                            <Image source = {ICONS.tick} 
                                name={check ? 'checkbox-marked' : 'checkbox-blank-outline'} color="#000" 
                                style={{width: 26, height: 26,position:'absolute', top:14, right:20, }}/>
                        </Pressable>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

export default SplitBillMembers;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    top: 8,
    right: 5,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  back: {
    // back arrow
    position: 'relative',
    justifyContent: 'flex-start',
    top: 8,
    right: 120,
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    position: 'relative',
  },

  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
    width: '100%',
  },

  middle: {
    top: 15,
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '90%',
    maxHeight: '90%',
    position: 'relative',
  },

  memberList: {
    flexDirection: 'column',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '80%',
    maxHeight: '80%',
    position: 'relative',
    marginBottom: 15,
  },

  memberBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E9D7FD',
    width: '75%',
    minHeight: '100%',
    maxHeight: '100%',
    borderRadius: 20,
    justifyContent: 'space-around',
  },

  indName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingStart: 15,
    width: 340,
    height: 50,
    borderRadius: 10,
    margin: 5,
    top: 5,
    bottom: 5,
  },

  tickBox: 
  {
    width: 26,
    height: 26,
    position: 'absolute',
    top:10,
    right: 20,
  },

  count: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    left: 20,
    color: '#000000',
  },

  upcomingEvent: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: -5,
    left: -140,
  },

  list: {
    fontSize: 18,
    color: '#4E1164',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    left: -120,
    top: 1,
    marginBottom: 5,
  },

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'column',
  },

  confirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '35%',
    minHeight: '9%',
    maxHeight: '9%',
    position: 'relative',
    top: 30,
    backgroundColor: '#4E1164',
    borderRadius: 10,
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    color: '#FFFFFF',
  },
});
