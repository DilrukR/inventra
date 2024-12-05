import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeaderPrimery, InventoryContainer} from '../../components';
import {s, scale} from 'react-native-size-matters';

type Props = {};

const Inventory = (props: Props) => {
  return (
    <View style={styles.container}>
      <HeaderPrimery title="Inventory" />

      <View>
        <InventoryContainer />
      </View>
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: scale(90),
  },
});
