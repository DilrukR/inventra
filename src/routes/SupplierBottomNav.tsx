import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SupplierHome,
  SupplierAddInventory,
  SupplierOrders,
  SupplierNotifications,
} from '../SupplierScreens';

const SupplierTabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="SupplierHome"
        component={SupplierHome}
        options={{
          tabBarLabel: 'SupplierHome',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SupplierAddInventory"
        component={SupplierAddInventory}
        options={{
          tabBarLabel: 'SupplierAddInventory',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SupplierOrders"
        component={SupplierOrders}
        options={{
          tabBarLabel: 'SupplierOrders',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SupplierNotifications"
        component={SupplierNotifications}
        options={{
          tabBarLabel: 'SupplierNotifications',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default SupplierTabNav;
