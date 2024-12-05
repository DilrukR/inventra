import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {HeaderPrimery, SingleRequest} from '../../components';
import {ScrollView} from 'react-native-virtualized-view';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getOrder, getsupplierOrders} from '../../redux/slices/orderSlice';
import {FlatList} from 'react-native-gesture-handler';
import {updateOrder} from '../../redux/slices/orderSlice';
import {s} from 'react-native-size-matters';

type Props = {};

const Requests = (props: Props) => {
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = React.useState(false);
  const orders = useAppSelector(state => state.orders.order);

  console.log('ore', orders);

  useEffect(() => {
    dispatch(getsupplierOrders());
  }, [clicked]);

  return (
    <View style={styles.container}>
      <HeaderPrimery title="Orders" />
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.order_Id);
              setClicked(!clicked);
              if (!clicked) {
                Alert.alert('Accept Order', 'Are you sure you want to accept', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch(
                        updateOrder({
                          orderId: item.order_Id,
                          status: 'Accepted',
                        }),
                      );
                    },
                  },
                ]);
              } else {
                Alert.alert('Reject Order', 'Are you sure you want to reject', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch(
                        updateOrder({
                          orderId: item.order_Id,
                          status: 'Rejected',
                        }),
                      );
                    },
                  },
                ]);
              }
            }}>
            <SingleRequest item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.order_Id}
        onRefresh={() => {
          <RefreshControl
            refreshing={true}
            onRefresh={() => {
              dispatch(getOrder());
            }}
          />;
        }}
      />
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
