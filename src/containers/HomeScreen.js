import React, {useState, useEffect, useContext} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';

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
            margin: 20,
            paddingBottom: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#52ADEB',
          }}>
          <Text>Temperatura actual del AC</Text>
          <Text style={{fontSize: 30, padding: 10, color: '#295675'}}>
            19ºC
          </Text>
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
