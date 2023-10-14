import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { retrieveToken } from '../utils/token';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from './Profile';
import Dashboard from './Dashboard';
import History from './History';
const Tab = createBottomTabNavigator();
const Home = () => {
  useEffect(() => {
    const fetchToken = async () => {
      const token = await retrieveToken();
      console.log(token);
    }
    fetchToken();
  }, []);

  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: { fontSize: 13, color: 'grey' },
        activeTintColor: '#0995d6',
        inactiveTintColor: 'grey',
      }}
      tabBarTransitionPreset="fade" // You can use different presets like 'fade', 'scale', 'slide' etc.
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        name="History"
        component={History}
      />
    </Tab.Navigator>
  );
}

export default Home;
