import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import FormButton from '../components/FormButton';
const screenWidth = Dimensions.get('window').width;
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
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Eduardo Nicolalde</Text>
            <Text style={styles.info}>Administrador</Text>
            <Text style={styles.description}>
              Esta app permite tomar decisiones para incrementar el ahorro energético en tu edificio sin afectar tu confort!
            </Text>
            <Text style={styles.description}>Edificio: 11C</Text>
            <Text style={styles.description}>Sala: Laboratorio de Sistemas Telemáticos</Text>
            <FormButton
              buttonTitle="Log Out"
              onPress={async () => {
                // TODO: Validar que los campos esten llenos
                // TODO: Autenticacion
                await firebase.auth().signOut();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#57c4ea',
    height: 350,
    width: screenWidth,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 280,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
export default ProfileScreen;
