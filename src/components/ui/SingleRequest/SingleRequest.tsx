import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Counter from '../Counter/Counter';
type Props = {
  item: any;
};

const SingleOrderItem = (props: Props) => {
  const pr = props.item;

  console.log(pr.product.image);

  return (
    <View style={styles.container}>
      <View style={styles.imageCon}>
        <Image
          source={{uri: pr?.product?.image}}
          style={{
            width: scale(100),
            height: scale(100),
            borderRadius: scale(5),
          }}
        />
      </View>
      <View style={styles.textCon}>
        <Text style={styles.title}>{pr?.product?.productName}</Text>
        <Text style={styles.price}>LKR: {pr?.product?.price}</Text>
      </View>
      <View>
        <Text> Status = {pr?.status}</Text>
      </View>
    </View>
  );
};

export default SingleOrderItem;

const styles = StyleSheet.create({
  container: {
    height: scale(120),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: scale(20),
  },

  imageCon: {
    height: scale(80),
    width: scale(80),
    backgroundColor: 'red',
    borderRadius: scale(5),
  },

  textCon: {
    height: scale(100),
    width: scale(90),
    marginLeft: scale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },

  price: {
    fontSize: scale(12),
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
});
