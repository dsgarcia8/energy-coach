import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './containers/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
