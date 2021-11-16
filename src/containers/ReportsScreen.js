import React, {useState, useEffect, useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

const ProfileScreen = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Text>Reports Screen</Text>
    </View>
  );
};

export default ProfileScreen;
