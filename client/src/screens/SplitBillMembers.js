import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const SplitBillMembers = ({ navigation }) => {
  const MemberList = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Hilary',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Marcus',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Jane',
    },

    //'Jeff',
    //'Letitia',
    //'Mark',
    //'Layla',
    //'Fred',
    //'Adrian',
  ];

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
          <GuestList list={MemberList} />
        </View>
        <TouchableOpacity
          style={styles.confirm}
          onPress={() => navigation.navigate('SplitBill')}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GuestList = props => {
  const renderItem = ({ item }) => <Box name={item.name} />;
  return (
    <View style={styles.memberBox}>
      <ScrollView>
        <FlatList
          data={props.list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

const Box = props => {
  return (
    <View style={styles.indName}>
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
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 340,
    height: 50,
    borderRadius: 10,
    margin: 5,
    top: 5,
    bottom: 5,
  },

  count: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  name: {
    fontSize: 18,
    top: 10,
    left: 100,
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
