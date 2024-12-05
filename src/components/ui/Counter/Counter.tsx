import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {decrement, increment} from '../../../redux/slices/counterSlice';

export default function Counter({quantitiy}: any) {
  const dispatch = useAppDispatch();
  const {value} = useAppSelector(state => state.counter);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.counter}>
          <TouchableOpacity
            disabled={value <= 0}
            onPress={() => {
              dispatch(decrement());
            }}
            style={styles.counterAction}>
            <Icon name="minus" size={16} color="white" />
          </TouchableOpacity>

          <Text style={styles.counterValue}>{value}</Text>

          <TouchableOpacity
            onPress={() => {
              dispatch(increment());
            }}
            style={styles.counterAction}>
            <Icon name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Counter */
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterAction: {
    width: 20,
    backgroundColor: '#7a7777',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  counterActionText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: '#98d0ca',
  },
  counterValue: {
    minWidth: 44,
    fontSize: 19,
    fontWeight: '600',
    color: '#1d1d1d',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});