/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TransactionContext } from '../context/transaction';
import { UserContext } from '../context/user';

const TransactionHistory = () => {
  const [user, setUser] = useContext(UserContext);
  const { paidTransactions } = useContext(TransactionContext);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Transaction History</Text>
      </View>

      <View
        style={[
          styles.middle,
          {
            justifyContent:
              paidTransactions.length > 0 ? 'flex-start' : 'center',
          },
        ]}>
        {paidTransactions.length > 0 ? (
          <TransactionList user={user} transactions={paidTransactions} />
        ) : (
          <Text style={styles.noTransaction}>
            No transaction history to show
          </Text>
        )}
      </View>
    </View>
  );
};

const TransactionList = ({ transactions, user }) => {
  let date = 1;

  return (
    <View style={styles.transactionList}>
      <FlatList
        data={transactions}
        renderItem={({ item, index }) => {
          if (
            date !== item.bill.date &&
            item.transaction.payee === user.username
          ) {
            date = item.bill.date;

            return (
              <View>
                <Text style={styles.date}>{date}</Text>
                <TransactionBox
                  name={item.transaction.payer}
                  amount={item.bill.amount}
                  isReceive={true}
                />
              </View>
            );
          } else if (
            date !== item.bill.date &&
            item.transaction.payee !== user.username
          ) {
            date = item.bill.date;

            return (
              <View>
                <Text style={styles.date}>{date}</Text>
                <TransactionBox
                  name={item.transaction.payee}
                  amount={item.bill.amount}
                  isReceive={false}
                />
              </View>
            );
          } else if (
            date === item.bill.date &&
            item.transaction.payee === user.username
          ) {
            return (
              <TransactionBox
                name={item.transaction.payer}
                amount={item.bill.amount}
                isReceive={true}
              />
            );
          } else if (
            date === item.bill.date &&
            item.transaction.payee !== user.username
          ) {
            return (
              <TransactionBox
                name={item.transaction.payee}
                amount={item.bill.amount}
                isReceive={false}
              />
            );
          }
        }}
        key={'_'}
        keyExtractor={(item, index) => index}
      />
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
          <Text style={styleSheet}>SGD {props.amount.toFixed(2)}</Text>
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
    marginTop: 15,
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
    color: '#29BF12',
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
    marginVertical: 3,
  },

  noTransaction: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    textAlign: 'center',
    width: '60%',
    color: '#808080',
  },
});
