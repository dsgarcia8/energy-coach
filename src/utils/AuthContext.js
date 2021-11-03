import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const onAuthStateChanged = user => {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{currentUser, setCurrentUser, initializing, setInitializing}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
