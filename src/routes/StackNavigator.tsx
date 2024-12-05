import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Login,
  Welcome,
  QrScanner,
  SingleProductScreen,
  Register,
  CreateOrder,
  UpdateUser,
  UpdateInventory,
  SelectRole,
} from '../screens';
import {
  SupplierRegister,
  SupplerWelcome,
  SupplierLogin,
} from '../SupplierScreens';
import SupplierTabNav from './SupplierBottomNav';
import React from 'react';

import TabNav from './BottomTabNavigator';
const StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SelectRole"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SupplerWelcome" component={SupplerWelcome} />
      <Stack.Screen name="SupplierRegister" component={SupplierRegister} />
      <Stack.Screen name="SupplierLogin" component={SupplierLogin} />
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="SupplierTabNav" component={SupplierTabNav} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="QrScanner"
        component={QrScanner}
        options={{animation: 'flip'}}
      />
      <Stack.Screen
        name="SingleProductScreen"
        component={SingleProductScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="updateInventory" component={UpdateInventory} />
      <Stack.Screen name="createOrder" component={CreateOrder} />
      <Stack.Screen name="updateUser" component={UpdateUser} />
    </Stack.Navigator>
  );
};

export default StackNav;
