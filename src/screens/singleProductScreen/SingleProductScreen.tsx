import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getProductById} from '../../redux/slices/productSlice';
import {ScrollView} from 'react-native-virtualized-view';
import {AuthHeader, ButtonPrimery, HeaderPrimery} from '../../components';
import {scale} from 'react-native-size-matters';
import {height} from '../../constants/contants';

type Props = {};

const SingleProductScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useAppDispatch();
  const {product} = useAppSelector(state => state.product);

  const {productId} = route.params as {productId: string};

  console.log(productId);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);

  console.log(product);

  if (!product) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', color: 'black'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderPrimery title="Product Details" />
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product?.data?.image,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.productName}>{product?.data?.productName}</Text>
          </View>

          <View>
            <Text style={styles.text2}>
              current quantity: {product?.data?.quantity}
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: scale(20)}}>
          <Text>{product?.data?.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonPrimery
            title="Update Quantitiy"
            onPress={() => {
              navigation.navigate('updateInventory', {
                product: product?.data,
              });
            }}
          />
          <ButtonPrimery
            title="Add Quantitiy"
            onPress={() => {
              navigation.navigate('createOrder', {
                product: product?.data,
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height,
  },

  imageContainer: {
    width: '100%',
    height: scale(280),
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    height: scale(60),
    paddingHorizontal: scale(20),
    marginTop: scale(20),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  productName: {
    fontSize: scale(24),
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },

  text2: {
    fontSize: scale(16),
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: scale(20),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
