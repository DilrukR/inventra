import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width, height} from '../../constants/contants';
import {ButtonPrimery} from '../../components';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.image_con}>
        <Image
          source={require('../../assets/images/4016257.jpg')}
          style={{width: width, height: scale(200)}}
          resizeMode="contain"
        />
      </View>

      {/* <View style={styles.input_container}>

      </View> */}

      <View style={styles.text_container}>
        <Text style={styles.title}>Welcome to {'\n'} Inventory Manager!</Text>

        <Text style={styles.description}>
          Manage, track, and organize your stock with ease.
        </Text>
      </View>

      <View style={styles.main_view}>
        <ButtonPrimery
          title="Login"
          onPress={() => {
            navigation.navigate('SupplierLogin');
          }}
        />

        <ButtonPrimery
          title="Register Supplier"
          onPress={() => {
            navigation.navigate('SupplierRegister');
          }}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  image_con: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    resizeMode: 'contain',

    top: scale(-90),
    left: 0,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },

  main_view: {
    height: scale(120),
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: scale(80),
  },

  input_container: {
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text_container: {
    top: scale(-60),
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(40),
  },

  title: {
    fontSize: scale(20),
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: 'black',
  },

  description: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: 'black',
  },
});
