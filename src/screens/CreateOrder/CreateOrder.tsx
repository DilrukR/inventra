import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {ButtonPrimery, HeaderPrimery, SingleOrderItem} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import PayHere from '@payhere/payhere-mobilesdk-reactnative';
import {createOrder} from '../../redux/slices/orderSlice';
type Props = {};

const CreateOrder = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {value} = useAppSelector(state => state.counter);
  const product = route.params as {product: any};
  const {user} = useAppSelector(state => state.user);

  console.log(user);

  console.log(product);

  console.log(PayHere);

  const paymentObject = {
    sandbox: true,
    merchant_id: '1227410',
    notify_url: 'http://sample.com/notify',
    order_id: 'ItemNo12345',
    items: `${product?.product?.productName}`,
    amount: `${product?.product?.price * value + 500}`,
    currency: 'LKR',
    first_name: `${user?.firstName}`,
    last_name: `${user?.lastName}`,
    email: `${user?.email}`,
    phone: `${user?.phone}`,
    address: `${user?.address}`,
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: `${user?.address}`,
    delivery_city: 'Kalutara',
    delivery_country: 'Sri Lanka',
  };

  const handlePayment = () => {
    PayHere.startPayment(
      paymentObject,
      paymentId => {
        dispatch(
          createOrder({
            user_Id: user.id,
            product_Id: product?.product?.id,
            quantity: value,
            price: product?.product?.price,
            status: 'pending',
            createdDate: '2024-10-18T09:00:00Z',
            updatedDate: '2024-10-18T09:00:00Z',
          }),
        );

        navigation.navigate('TabNav', {screen: 'Orders'});
      },
      errorData => {
        Alert.alert('PayHere Error', errorData);
      },
      () => {
        console.log('Payment Dismissed');
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <HeaderPrimery title="Create Order" />
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Inventory</Text>
      </View>

      <View>
        <SingleOrderItem item={product} />
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.singlePriceItem}>
          <Text style={styles.priceText}>SubTotal</Text>
          <Text style={styles.price}>
            LKR {product?.product?.price * value}
          </Text>
        </View>
        <View style={styles.singlePriceItem}>
          <Text style={styles.priceText}>Shipping</Text>
          <Text style={styles.price}>LKR 500</Text>
        </View>
        <View style={styles.singlePriceItem}>
          <Text style={styles.priceText}>Total</Text>
          <Text style={styles.price}>
            LKR {product?.product?.price * value + 500}
          </Text>
        </View>
      </View>

      <View style={styles.button}>
        <ButtonPrimery title="Place Order" onPress={() => handlePayment()} />
      </View>
    </View>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
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

  totalContainer: {
    height: scale(60),
    paddingHorizontal: scale(20),
    marginTop: scale(190),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },

  singlePriceItem: {
    height: scale(40),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  priceText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },

  price: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },

  button: {
    position: 'absolute',
    bottom: scale(20),
    width: '100%',
    paddingHorizontal: scale(20),
  },
});
