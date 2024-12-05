import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {
  HeaderPrimery,
  SingleInventoryItem,
  SingleOrderItem2,
  ButtonPrimery,
} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateInventory} from '../../redux/slices/userInventorySlice';

type Props = {};

const UpdateInventory = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [quantity, setQuantity] = React.useState(0);
  const {qty} = useAppSelector(state => state.counter2);

  const incrimentQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrimentQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleUpdate = async () => {
    try {
      dispatch(
        updateInventory({quantity: qty, productId: product?.id}),
      ).unwrap();

      Alert.alert('Success', 'Your inventory has been updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  const {product} = route.params;
  const wrappedProduct = {
    product: product,
  };
  return (
    <View style={{flex: 1}}>
      <HeaderPrimery title="Update Inventory" />

      <View>
        <SingleOrderItem2
          item={wrappedProduct}
          incriment={incrimentQuantity}
          decrement={decrimentQuantity}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonPrimery title="Update Quantitiy" onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default UpdateInventory;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: scale(20),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
