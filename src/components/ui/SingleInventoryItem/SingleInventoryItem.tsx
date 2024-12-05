import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: object;
};

const SingleInventoryItem = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingleProductScreen', {
            productId: props.item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: props.item.image}}
            style={{width: '100%', height: '100%', borderRadius: scale(5)}}
          />
        </View>

        <View style={styles.textContainer}>
          <View>
            <Text style={styles.productName}>{props.item.productName}</Text>
            <Text style={styles.quantity}>{props.item.quantity}</Text>
          </View>

          <View>
            <Text style={styles.quantity}> LKR{props.item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleInventoryItem;

const styles = StyleSheet.create({
  container: {
    width: scale(150),
    height: scale(190),
    backgroundColor: '#fff',
    shadowColor: '#000',
    padding: scale(5),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: scale(10),
    alignItems: 'center',

    margin: scale(10),
  },

  imageContainer: {
    width: scale(140),
    height: scale(120),
    backgroundColor: 'red',
    borderRadius: scale(5),
  },

  productName: {
    fontSize: scale(16),
    fontFamily: 'Montserrat-Bold',
    marginTop: scale(10),
  },
  quantity: {
    fontSize: scale(16),
    marginTop: scale(5),
    fontFamily: 'Montserrat-Regular',
  },

  textContainer: {
    height: scale(60),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
