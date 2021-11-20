import React, {useState, useEffect, useContext} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const temp_in = 0;
let temp_ac = 0;

//intento 1
firestore()
  .collection('metrics')
  .doc('MTgkDoUl5lekx1SDCAZs')
  .get()
  .then( documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);
    if (documentSnapshot.exists) {
      temp_ac = documentSnapshot.data().temp_ac;
    }
  });
console.log(temp_ac);

//intento 2
// const user = firestore()
//   .collection('metrics')
//   .doc('MTgkDoUl5lekx1SDCAZs')
//   .get();

//intento 3
// eslint-disable-next-line react-hooks/rules-of-hooks
// let temp_ac2 = useState(0)
// // eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//   //load hospitals into hospitalsList
//   // const hospitals = []
//   firestore()
//     .collection('metrics')
//     .doc('MTgkDoUl5lekx1SDCAZs')
//     .get()
//     .then(documentsnapshot => {
//       temp_ac2 = documentsnapshot.data();
//     });
// });

const HomeScreen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      <View>
        <Text
          style={{
            color: '#295675',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Consumo enérgetico elevado
        </Text>
      </View>
      <View
        style={{
          //flex: 1,
          // justifyContent: "space-between",
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '15%',
          borderWidth: 2.5,
          borderColor: '#52ADEB',
          borderRadius: 10,
          margin: 20,
        }}>
        <Text> Subir temperatura del AC </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: '50%',
          borderWidth: 2.5,
          borderStyle: 'solid',
          borderColor: '#52ADEB',
          borderRadius: 10,
          margin: 20,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            paddingBottom: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#52ADEB',
          }}>
          <Text style={{margin: 5}}>Temperatura actual del AC</Text>
          <Ionicons name="snow-outline" size={30} color="#52ADEB" />
          <Text style={{fontSize: 30, padding: 10, color: '#295675'}}>19ºC</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            height: 100,
            justifyContent: 'space-evenly',
            borderBottomWidth: 2,
            borderBottomColor: '#52ADEB',
            margin: 20,
          }}>
          <View
            style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Edificio 16A</Text>
          </View>
          <View
            style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Lab de Sistemas Telemáticos</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{}}>Ahorro Energético esperado</Text>
          <Text style={{fontSize: 30, padding: 10, color: '#295675'}}>8%</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
