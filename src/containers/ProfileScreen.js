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
      <View style={{justifyContent: 'flex-end'}}>
        <Button
          title="Log out"
          onPress={async () => {
            // TODO: Validar que los campos esten llenos
            // TODO: Autenticacion
            await firebase.auth().signOut();
          }}
        />
      </View>

    </View>
  );
};

export default ProfileScreen;
