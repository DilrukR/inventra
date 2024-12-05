import {StyleSheet, TextInput, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import {AuthHeader, ButtonPrimery, HeaderPrimery} from '../../components';
import {width} from '../../constants/contants';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getUser, updateUser} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user.user);

  // State hooks
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  // Redirect to Login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  // Update handler
  const handleUpdate = () => {
    if (!email || !firstName || !lastName || !phone || !address) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    dispatch(
      updateUser({
        email, // Password is optional, validate if needed
        firstName,
        lastName,
        phone,
        address,
      }),
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Your profile has been updated successfully', [
          {
            text: 'OK',
            onPress: () => dispatch(getUser()),
          },
        ]);
        navigation.goBack(); // Optionally navigate back after updating
      })
      .catch(error => {
        Alert.alert('Error', error.message || 'Something went wrong');
      });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: scale(80)}}>
        <HeaderPrimery title="Update Profile" />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          placeholderTextColor="gray"
        />
      </ScrollView>
      <View style={styles.buttonCon}>
        <ButtonPrimery title="Update" onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  input: {
    height: scale(50),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: scale(15),
    padding: scale(15),
    marginVertical: scale(10),
    width: width - scale(40),
    alignSelf: 'center',
    color: 'black',
  },
  buttonCon: {
    marginTop: scale(20),
    width: width - scale(40),
    alignSelf: 'center',
    position: 'absolute',
    bottom: scale(20),
  },
});
