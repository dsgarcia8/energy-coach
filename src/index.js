import React, { useState, useEffect } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import auth from '@react-native-firebase/auth';

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text>Login Screen</Text>
        <View style={{padding: 2}}>
          <TextInput
            placeholder={'Username'}
            value={userName}
            onChangeText={userName => setUserName(userName)}
            style={{borderColor: 'grey', borderWidth: 1}}
          />
        </View>
        <View style={{padding: 2}}>
          <TextInput
            placeholder={'Password'}
            value={password}
            onChangeText={password => setPassword(password)}
            style={{borderColor: 'grey', borderWidth: 1}}/>
        </View>
        <Button
          title="Log in"
          onPress={() => {
            // TODO: Validar que los campos esten llenos
            // TODO: Autenticacion
            __doSingIn(userName, password);
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

export default AppNavigator;
