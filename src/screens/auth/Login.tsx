import {Alert, StyleSheet, Text, TextInput, View, useS} from 'react-native';
import React, {useState} from 'react';
import {AuthHeader, ButtonPrimery} from '../../components';
import {scale} from 'react-native-size-matters';
import {height, width} from '../../constants/contants';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {login} from '../../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {status, error} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);

    if (email === '' || password === '') {
      Alert.alert('Please enter email and password');
      setLoading(false);
      return;
    }
    try {
      await dispatch(login({email, password})).unwrap();
      navigation.navigate('TabNav');
    } catch (err) {
      setLoading(false);
      Alert.alert('Login Error', 'An error occurred');
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={MD2Colors.grey300} />
        </View>
      )}

      <View>
        <AuthHeader />
      </View>

      <View style={styles.title_container}>
        <Text style={styles.title}>Let's Sign you in</Text>
        <Text style={styles.description}>
          Welcome back {'\n'}You have been missed!
        </Text>
      </View>

      <View style={styles.input_container}>
        <View>
          <Text style={styles.Input_title}>Email</Text>
          <TextInput
            placeholder="Enter your Email here"
            style={styles.input}
            placeholderTextColor={'#D4D4D4'}
            scrollEnabled={true}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={{marginTop: scale(20)}}>
          <Text style={styles.Input_title}>Password</Text>
          <TextInput
            placeholder="Enter your password here"
            secureTextEntry
            style={styles.input}
            placeholderTextColor={'#D4D4D4'}
            scrollEnabled={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
      </View>

      <View style={styles.button_container}>
        <ButtonPrimery onPress={handleLogin} title="Login" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title_container: {
    marginTop: scale(40),
    paddingHorizontal: scale(40),
  },

  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(30),
    marginBottom: 10,
    color: '#252422',
  },

  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(20),
    lineHeight: scale(40),
    color: '#252422',
  },

  input_container: {
    marginTop: scale(40),
    paddingHorizontal: scale(20),
  },

  Input_title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scale(12),
    marginBottom: scale(0),
    marginLeft: scale(5),
    color: '#252422',
  },

  input: {
    height: scale(50),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: scale(15),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    padding: scale(15),
  },

  button_container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(160),
  },
  loadingOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
});
