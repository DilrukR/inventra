import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Octicons';
import {DataTable} from 'react-native-paper';

type Props = {};

const HomeHero = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="stack" size={scale(24)} color="black" />
      </View>

      <View>
        <Text style={styles.card_title}>Inventory Summery</Text>
      </View>

      <View style={styles.data_con}>
        <View style={styles.data_row}>
          <View style={styles.data_cell}>
            <Text style={styles.data_cell_title}>Category Items</Text>
            <Text style={styles.data_cell_data}>24</Text>
          </View>
          <View style={styles.data_cell}>
            <Text style={styles.data_cell_title}>Folders</Text>
            <Text style={styles.data_cell_data}>15</Text>
          </View>
        </View>
        <View style={styles.data_row}>
          <View style={styles.data_cell}>
            <Text style={styles.data_cell_title}>Total Qty</Text>
            <Text style={styles.data_cell_data}>479 Items</Text>
          </View>
          <View style={styles.data_cell}>
            <Text style={styles.data_cell_title}>Total Value</Text>
            <Text style={styles.data_cell_data}>LkR 234000.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHero;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 100,
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  borderRadiusCon: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: '60%',
    height: '100%',
    backgroundColor: '#252422',
  },

  iconContainer: {
    width: '20%',
    paddingLeft: scale(20),
    paddingTop: scale(10),
  },

  card_title: {
    fontSize: scale(14),
    color: '#252422',
    fontFamily: 'Montserrat-Bold',
    paddingLeft: scale(20),
    paddingTop: scale(10),
  },

  data_con: {
    paddingLeft: scale(20),
    paddingTop: scale(10),
  },

  data_row: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  data_cell: {
    width: '50%',
  },

  data_cell_title: {
    fontSize: scale(12),
    color: '#252422',
    fontFamily: 'Montserrat-Regular',
    marginBottom: scale(2),
  },

  data_cell_data: {
    fontSize: scale(12),
    color: '#252422',
    fontFamily: 'Montserrat-Bold',
  },
});
