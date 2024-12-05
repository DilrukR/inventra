import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {AuthHeader, ButtonPrimery} from '../../components';
import {width} from '../../constants/contants';
import {useAppDispatch} from '../../hooks/hooks';
import {registerSupplier} from '../../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const Register = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = () => {
    dispatch(
      registerSupplier({
        email,
        password,
        firstName,
        lastName,
        phone,
        address,
        deviceToken: '',
      }),
    )
      .unwrap()
      .then(() => {
        Alert.alert('Registration successful', 'You are now registered', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SupplierLogin'),
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Registration Error', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <AuthHeader />
        </View>

        <View style={styles.title_container}>
          <Text style={styles.title}>Let's Sign you Up</Text>
          <Text style={styles.description}>Welcome to Inventra</Text>
        </View>

        <View style={styles.input_container}>
          <View style={styles.input_item}>
            <Text style={styles.Input_title}>First Name</Text>
            <TextInput
              placeholder="Enter your First Name here"
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              value={firstName} // Bind state to the value of the TextInput
              onChangeText={text => setFirstName(text)} // Update the state on change
            />
          </View>
          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Last Name</Text>
            <TextInput
              placeholder="Enter your Last Name here"
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              value={lastName} // Bind state to the value of the TextInput
              onChangeText={text => setLastName(text)} // Update the state on change
            />
          </View>
          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Email</Text>
            <TextInput
              placeholder="Enter your Email here"
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              keyboardType="email-address"
              value={email} // Bind state to the value of the TextInput
              onChangeText={text => setEmail(text)} // Update the state on change
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Phone Number</Text>
            <TextInput
              placeholder="Enter your Phone Number here"
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              keyboardType="numeric"
              value={phone} // Bind state to the value of the TextInput
              onChangeText={text => setPhone(text)} // Update the state on change
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Address</Text>
            <TextInput
              placeholder="Enter your Address here"
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              value={address} // Bind state to the value of the TextInput
              onChangeText={text => setAddress(text)} // Update the state on change
            />
          </View>

          <View style={styles.input_item}>
            <Text style={styles.Input_title}>Password</Text>
            <TextInput
              placeholder="Enter your password here"
              secureTextEntry
              style={styles.input}
              placeholderTextColor={'#D4D4D4'}
              value={password} // Bind state to the value of the TextInput
              onChangeText={text => setPassword(text)} // Update the state on change
            />
          </View>
        </View>

        <View style={styles.button_container}>
          <ButtonPrimery title="Sign Up" onPress={handleRegister} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
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
    marginBottom: scale(5),
    marginLeft: scale(5),
    color: '#252422',
  },

  input_item: {
    marginBottom: scale(20),
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
    marginTop: scale(60),
    marginBottom: scale(40),
  },
});
