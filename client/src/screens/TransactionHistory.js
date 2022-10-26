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
    </View>
  );
};

const TransactionList = props => {
  return (
    <View style={styles.transactionList}>
      <Text style={styles.date}>{props.date.toUpperCase()}</Text>
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
    <View style={styles.transactionBox}>
      <View style={styles.oneDate}>
        <View style={styles.up}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.down}>
          <Text style={styleSheet}>SGD {props.amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    top: 8,
    fontFamily: 'Poppins-Bold',
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
    justifyContent: 'flex-start',
    backgroundColor: '#f0ecec',
    width: 500,
    minHeight: '90%',
    maxHeight: '90%',
  },

  oneDate: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 370,
    height: 80,
    borderRadius: 15,
  },

  date: {
    fontSize: 15,
    left: 3,
    fontFamily: 'Poppins-Bold',
    color: '#4E1164',
  },

  up: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '50%',
  },

  down: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '50%',
  },

  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    left: 15,
    color: '#000000',
    justifyContent: 'flex-start',
  },

  amountReceive: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#00FF00',
    bottom: 7,
    right: 10,
  },

  amountGive: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#FF0000',
    bottom: 7,
    right: 10,
  },

  smallText: {
    fontSize: 13,
    color: '#4E1164',
    flexDirection: 'row',
  },

  transactionList: {
    marginVertical: 10,
  },

  transactionBox: {
    marginVertical: 5,
  },
});
