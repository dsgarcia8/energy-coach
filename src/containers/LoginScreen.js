import React, {useState, useEffect, useContext} from 'react';
// import * as React from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../utils/AuthContext';
import FormButton from '../components/FormButton';

const LoginScreen = () => {
  const {currentUser} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert('Success ✅', 'Authenticated successfully');
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  if (!currentUser) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}>
        <Text>Email</Text>
        <View style={{padding: 2, width: '50%', fontFamily: 'Lato-Regular'}}>
          <TextInput
            placeholder={'Username'}
            value={userName}
            onChangeText={userName => setUserName(userName)}
            style={{borderColor: 'grey', borderWidth: 1}}
          />
        </View>
        <Text style={{justifyContent: 'flex-start'}}>Password</Text>
        <View style={{padding: 2, width: '50%'}}>
          <TextInput
            placeholder={'Password'}
            value={password}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            style={{borderColor: 'grey', borderWidth: 1}}
          />
        </View>
        <FormButton
          buttonTitle="Sign In"
          onPress={() => {
            // TODO: Validar que los campos esten llenos
            // TODO: Autenticacion
            __doSingIn(userName, password);
          }}
        />
        {/*<Button*/}
        {/*  title="Log in"*/}
        {/*  onPress={() => {*/}
        {/*    // TODO: Validar que los campos esten llenos*/}
        {/*    // TODO: Autenticacion*/}
        {/*    __doSingIn(userName, password);*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome hgdhgd {currentUser.email}</Text>
      <Button
        title="Log out"
        onPress={async () => {
          // TODO: Validar que los campos esten llenos
          // TODO: Autenticacion
          await firebase.auth().signOut();
        }}
      />
    </View>
  );
};

export default LoginScreen;
