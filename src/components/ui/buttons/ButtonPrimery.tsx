import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Scale, ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
type Props = {
  title: string;
  onPress: () => void;
};

const ButtonPrimery = (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.title === 'Register'
          ? {backgroundColor: '#B0B0B0'}
          : {backgroundColor: '#252422'},
      ]}
      onPress={props.onPress}>
      <Text style={[styles.title]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimery;

const styles = ScaledSheet.create({
  button: {
    width: '300@s',
    height: '60@ms',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '15@ms',
    borderWidth: '1@ms',
    borderColor: 'white',
  },

  title: {
    fontSize: '18@ms',
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
