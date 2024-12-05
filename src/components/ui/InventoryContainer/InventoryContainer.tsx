import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import SingleInventoryItem from '../SingleInventoryItem/SingleInventoryItem';
import {width} from '../../../constants/contants';
import {
  getUserInventory,
  resetInventory,
} from '../../../redux/slices/userInventorySlice';

type Props = {};

const InventoryContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const {userInventory, loading, error, hasNextPage} = useAppSelector(
    state => state.userInventory,
  );

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch inventory data when page changes
  useEffect(() => {
    dispatch(getUserInventory({page, limit: 10}));
  }, [page]);

  // Load more data for pagination
  const loadMoreData = () => {
    if (!loading && hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Handle refresh logic
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetInventory());
    setPage(1); // Reset to the first page
    dispatch(getUserInventory({page: 1, limit: 10})).finally(() =>
      setRefreshing(false),
    );
  };

  // Render footer for infinite scroll
  const renderFooter = () => {
    if (!hasNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={userInventory}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <SingleInventoryItem item={item} />}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        width: width,
        gap: 10,
        padding: 10,
      }}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default InventoryContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});
