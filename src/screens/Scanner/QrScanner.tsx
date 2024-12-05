import {Alert, StyleSheet, Text, View, Vibration} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {ButtonPrimery} from '../../components';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const QrScanner = (props: Props) => {
  const navigation = useNavigation();
  const {requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [activeCam, setActiveCam] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: value => {
      console.log(value);
      setActiveCam(false);

      setTimeout(() => {
        Alert.alert((value as string[])[0].value, undefined, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SingleProductScreen', {
                productId: (value as string[])[0].value,
              });
            },
          },
        ]);
      }, 1000);
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        {device && (
          <Camera
            isActive={activeCam}
            device={device}
            codeScanner={codeScanner}
            style={{width: scale(300), height: scale(300)}}
          />
        )}
      </View>

      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <ButtonPrimery
          title="Scan Again"
          onPress={() => {
            setActiveCam(true);
          }}
        />
      </View>
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
