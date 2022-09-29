import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TransactionHistory = () => {
  const list1 = [
    ['ammaeudos', '2342', true],
    ['dobin', '45', false],
  ];
  const list2 = [
    ['ammaeudos', '2342', true],
    ['dobin', '45', false],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Transaction History</Text>
      </View>
      <View style={styles.middle}>
        <TransactionList date="28 aug" list={list1} />
        <TransactionList date="27 aug" list={list2} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.smalltext}>Nav Bar</Text>
      </View>
    </View>
  );
};

const TransactionList = props => {
  return (
    <View>
      <Text style={styles.date}>{props.date}</Text>
      <View>
        {props.list.map(listItem => (
          <TransactionBox
            key={listItem[0]}
            name={listItem[0]}
            amount={listItem[1]}
            isReceive={listItem[2]}
          />
        ))}
      </View>
    </View>
  );
};

const TransactionBox = props => {
  let styleSheet = '';
  if (props.isReceive) {
    styleSheet = styles.amountReceive;
  } else {
    styleSheet = styles.amountGive;
  }

  return (
    <View>
      <View style={styles.oneDate}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styleSheet}>{props.amount}</Text>
      </View>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    top: 10,
    fontFamily: 'OleoScript-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4E1164',
  },

  head: {
    backgroundColor: '#E9D7FD',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    height: '100%',
  },

  top: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '10%',
    maxHeight: '10%',
  },

  middle: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '83%',
    maxHeight: '83%',
  },

  bottom: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    minHeight: '7%',
    maxHeight: '7%',
  },

  oneDate: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9D7FD',
    width: 370,
    height: 80,
    borderRadius: 15,
  },

  date: {
    fontSize: 15,
    left: 3,
    fontFamily: 'OleoScript-Bold',
    color: '#4E1164',
  },

  name: {
    fontSize: 20,
    top: -5,
    left: -110,
    color: '#000000',
  },

  amountReceive: {
    fontSize: 20,
    top: 12,
    left: 140,
    color: '#00FF00',
  },

  amountGive: {
    fontSize: 20,
    top: 12,
    left: 140,
    color: '#FF0000',
  },

  smalltext: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },
});
