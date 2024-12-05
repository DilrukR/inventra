import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile, Inventory, Requests} from '../screens';

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
