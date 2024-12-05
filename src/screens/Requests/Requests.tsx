import {StyleSheet, Text, View, RefreshControl} from 'react-native';
import React, {useEffect} from 'react';
import {HeaderPrimery, SingleRequest} from '../../components';
import {ScrollView} from 'react-native-virtualized-view';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getOrder} from '../../redux/slices/orderSlice';
import {FlatList} from 'react-native-gesture-handler';

type Props = {};

const Requests = (props: Props) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.order);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderPrimery title="Orders" />
      <FlatList
        data={orders}
        renderItem={({item}) => <SingleRequest item={item} />}
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
