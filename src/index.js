import React, {useState, useEffect, useContext} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './containers/LoginScreen';
import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import {AuthContext} from './utils/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReportsScreen from './containers/ReportsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Reports') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen
      options={{
        headerShown: false,
      }}
      name="Profile"
      component={ProfileScreen}
    />
    <Tab.Screen
      options={{
        headerShown: false,
      }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        headerShown: false,
      }}
      name="Reports"
      component={ReportsScreen}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="HomeFeed"
      component={AppTab}
    />
  </Stack.Navigator>
);
// const HomeFeed = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="HomeScreen" component={HomeScreen} />
//   </Stack.Navigator>
// );

const AppNavigator = () => {
  const {currentUser} = useContext(AuthContext);
  const isSignedIn = !!currentUser?.email;
  console.log(isSignedIn);

  return (
    <>
      {isSignedIn ? (
        <>
          <AppStack />
        </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
          }} name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppNavigator;
