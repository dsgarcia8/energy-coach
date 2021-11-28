import React, {useState, useEffect, useContext} from 'react';
import {Alert, Button, Text, TextInput, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [controlAC, setControlAC] = useState([]);
  var db = firestore();

  const setControl = async () => {
    const database = firebase
      .app()
      .database('https://energy-coach-default-rtdb.firebaseio.com')
      .ref('/recomendation')
      .set({rec: controlAC})
      .then(() => console.log(controlAC));
  };

  useEffect(() => {
    db.collection('recommendations')
      .orderBy('datetime', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        console.log('hey', snapshot.docs);
        snapshot.docs.map(function (doc) {
          let item = doc.data();
          // let option = item.option;
          setControlAC(item.option);
          console.log('valor', item.option);
        });
      });
  }, []);

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
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <FormButton
              buttonTitle="Aceptar"
              onPress={() => {
                setControl().then(r => console.log('se envió control'));
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FormButton
              buttonTitle="Rechazar"
              onPress={() => {
                console.log('hey');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '125%',
    alignSelf: 'flex-start',
    marginTop: 60,
  },
  buttonContainer: {
    flex: 1,
  },
});
{
  /*        </View>*/
}
{
  /*      </View>*/
}
{
  /*      <View>*/
}
{
  /*        <View style={{width: 300, alignItems: 'center'}}>*/
}
{
  /*          <FormButton*/
}
{
  /*            buttonTitle="Aceptar"*/
}
{
  /*            onPress={() => {*/
}
{
  /*              setControl().then(r => console.log('yeah'));*/
}
{
  /*              console.log('hey');*/
}
{
  /*            }}*/
}
{
  /*          />*/
}
{
  /*        </View>*/
}
{
  /*      </View>*/
}
{
  /*    </View>*/
}
{
  /*  );*/
}
{
  /*};*/
}

export default HomeScreen;
