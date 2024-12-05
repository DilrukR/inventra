import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import StackNav from './src/routes/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import {Alert, AppState} from 'react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
