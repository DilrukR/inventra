import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
type Props = {
  title: string;
};

const HeaderPrimery = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={scale(30)} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>

      <View></View>
    </View>
  );
};

export default HeaderPrimery;

const styles = StyleSheet.create({
  container: {
    height: scale(70),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    flexDirection: 'row',
  },

  titleText: {
    fontSize: scale(18),
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
});
