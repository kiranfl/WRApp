/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WIDTH = '70%';

const styles = StyleSheet.create({
  dateHeader: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#ff4d01',
    paddingVertical: 5,
    minWidth: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temprature: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#C0C0C0',
    paddingVertical: 5,
    minWidth: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    minWidth: WIDTH,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: 'black',
    height: '100%',
    width: 1,
  },
  boxText: {
    marginVertical: 5,
    minWidth: '40%',
    textAlign: 'center',
  },
});

const renderDataView = (leftColData, rightColData, bgColor) => (
  <View style={[styles.box, {backgroundColor: bgColor}]}>
    <Text style={styles.boxText}>{leftColData}</Text>

    <View style={styles.divider} />

    <Text style={styles.boxText}>{rightColData}</Text>
  </View>
);

export const Table = ({data}) => {
  return (
    <View style={{marginVertical: 10}}>
      <View style={styles.dateHeader}>
        <Text styles={styles.text}>
          {new Date(data.item.dt_txt).toLocaleDateString('en-GB')}
        </Text>
      </View>
      <View style={styles.temprature}>
        <Text styles={styles.text}>Temprature</Text>
      </View>
      {renderDataView('Min', 'Max', '#C0C0C0')}
      {renderDataView(
        data.item.main.temp_min,
        data.item.main.temp_max,
        '#C0C0C0'
      )}
      {renderDataView('Pressure', data.item.main.pressure, 'white')}
      {renderDataView('Humidity', data.item.main.humidity, 'white')}
    </View>
  );
};
