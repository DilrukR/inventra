import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ButtonPrimery, HeaderPrimery} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from 'react-native-size-matters';
import {width} from '../../constants/contants';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../redux/slices/userSlice';
type Props = {};

const Profile = (props: Props) => {
  const user = useAppSelector(state => state.user.user);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderPrimery title="Profile" />

      <View style={styles.imageContainer}>
        <Icon name="user-circle-o" size={scale(90)} color="black" />
      </View>

      <View style={styles.container2}>
        <View style={styles.item}>
          <Text style={styles.text1}>Firstname</Text>
          <Text style={styles.text}>{user?.firstName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.text1}>Lastname</Text>
          <Text style={styles.text}>{user?.lastName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.text1}>Email</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.text1}>Phone</Text>
          <Text style={styles.text}>{user?.phone}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.text1}>Address</Text>
          <Text style={styles.text}>{user?.address}</Text>
        </View>
      </View>

      <View style={styles.container23}>
        <ButtonPrimery
          title="Edit Profile"
          onPress={() => {
            navigation.navigate('updateUser');
          }}
        />

        <ButtonPrimery
          title="Logout"
          onPress={() => {
            navigation.navigate('Welcome');
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    width: width,
    height: scale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    height: scale(20),
    width: width / 1.5,

    marginTop: scale(20),
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  container2: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    fontSize: scale(16),
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textAlign: 'left',
    marginRight: scale(80),
  },

  text: {
    fontSize: scale(16),
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    textAlign: 'left',
  },

  container23: {
    position: 'absolute',
    bottom: scale(10),
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(20),
  },
});
