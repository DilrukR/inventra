import {StyleSheet, View, Text, FlatList, Alert, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, Portal, useTheme} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Fontisto';
import messaging from '@react-native-firebase/messaging';
import {
  HomeHero,
  InventoryContainer,
  SingleInventoryItem,
} from '../../components';
import {ScrollView} from 'react-native-virtualized-view';
import {getUserInventory} from '../../redux/slices/userInventorySlice';
import {
  getUser,
  updateSupplier,
  updateUser,
} from '../../redux/slices/userSlice';
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const themecon = useTheme({
    mode: 'adaptive',
    dark: false,
    colors: {
      primary: 'green',
      accent: 'yellow',
      background: 'white',
      backdrop: 'white',
      surface: 'black',
      onSurface: '#000',
    },
  });
  const {token} = useAppSelector(state => state.auth);
  const {user} = useAppSelector(state => state.user);

  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestPermission();
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'New Notification',
        JSON.stringify(remoteMessage.notification),
      );
    });

    messaging()
      .getToken()
      .then(token => {
        try {
          dispatch(updateSupplier({deviceToken: token}));
        } catch (error) {
          console.log(error);
        }
      });

    return unsubscribe;
  }, []);

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Track app state changes
    const handleAppStateChange = (nextAppState: string) => {
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Only show alert if the app is active
      if (appState === 'active') {
        Alert.alert('New Notification', remoteMessage.notification?.body);
      } else {
        console.log(
          'Notification received while app is not in the foreground.',
        );
      }
    });

    return unsubscribe;
  }, [appState]);

  const onStateChange = () => setOpen(!open);

  const today = new Date();
  const formattedDate = today.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  console.log(formattedDate);

  useEffect(() => {
    dispatch(getUserInventory({page: 1, limit: 100}));
    dispatch(getUser());
  }, []);

  const currentTime = new Date().getHours();
  const isDay = currentTime >= 6 && currentTime < 18;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header_con}>
            <View style={styles.date_con}>
              {isDay ? (
                <Icon name="day-sunny" size={scale(28)} color="black" />
              ) : (
                <Icon name="night-clear" size={scale(28)} color="black" />
              )}
              <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <View>
              <Text style={styles.nameText}>Welcome {user?.firstName}</Text>
            </View>
          </View>
          <View style={styles.hero_con}>
            <HomeHero />
          </View>
        </View>

        {isFocused && (
          <Portal theme={themecon}>
            <FAB.Group
              style={{
                paddingBottom: scale(60),
                paddingRight: scale(10),
                color: 'black',
              }}
              open={open}
              visible
              icon={open ? 'calendar-today' : 'plus'}
              actions={[
                {
                  label: 'Add Stock',
                  icon: 'plus',
                  onPress: () => console.log('Pressed add'),
                },
                {
                  icon: 'camera',
                  label: 'Scan QR',
                  onPress: () => navigation.navigate('QrScanner'),
                },
                {
                  icon: 'bell',
                  label: 'Remind',
                  onPress: () => console.log('Pressed notifications'),
                },
              ]}
              onStateChange={onStateChange}
            />
          </Portal>
        )}

        {/* <SingleInventoryItem /> */}
        <InventoryContainer />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: 'relative',
    zIndex: 99,
  },

  header_con: {
    marginBottom: scale(10),
  },

  hero_con: {
    width: '100%',
    height: scale(220),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
  },

  date_con: {
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    marginLeft: scale(10),
    fontSize: scale(12),
    fontFamily: 'Montserrat-Medium',
    color: '#6c757d',
  },

  nameText: {
    fontSize: scale(20),
    fontFamily: 'Montserrat-Bold',
    color: '#252422',
    paddingLeft: scale(20),
  },
});
