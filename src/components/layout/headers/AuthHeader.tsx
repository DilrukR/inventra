import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
type Props = {};

const AuthHeader = (props: Props) => {
  const navigtion = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigtion.goBack();
        }}>
        <Icon name="long-arrow-left" size={scale(30)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(40),
    height: scale(40),
    paddingHorizontal: scale(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
