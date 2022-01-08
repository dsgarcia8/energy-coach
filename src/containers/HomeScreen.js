import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Modal, Button, StyleSheet, Dimensions, TouchableHighlight} from "react-native";
import FormButton from '../components/FormButton';
import {Slider, Icon} from 'react-native-elements';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowHeight } from "../utils/Dimensions";

var db = firestore();
const screenWidth = Dimensions.get('window').width;
type SlidersComponentProps = {};

const HomeScreen: React.FunctionComponent<SlidersComponentProps> = () => {
  const [controlAC, setControlAC] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);

  const left = ((value - 16) * (screenWidth - 21)) / 9;

  const setControl = async () => {
    const database = firebase
      .app()
      .database('https://energy-coach-default-rtdb.firebaseio.com')
      .ref('/recomendation')
      .set({rec: controlAC})
      .then(() => console.log(controlAC));
  };

  useEffect(() => {
    const subscriber = db
      .collection('recommendations')
      .orderBy('datetime', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        console.log('hey', snapshot.docs);
        snapshot.docs.map(function (doc) {
          let item = doc.data();
          // let option = item.option;
          setControlAC(item.option);
          setModalVisible(true);
          console.log('valor', item.option);
        });
      });
    return () => subscriber();
  }, []);

  let recommendation = '';
  let energy_saving = '';
  switch (controlAC) {
    case 1:
      recommendation = 'Encender AC';
      energy_saving = '0%';
      break;
    case 2:
      recommendation = 'Apagar AC';
      energy_saving = '10%';
      break;
    case 3:
      recommendation = 'Subir temperatura del AC';
      energy_saving = '5%';
      break;
    case 4:
      recommendation = 'Bajar temperatura del AC';
      energy_saving = '0%';
      break;
    case 5:
      recommendation = 'Mantener el estado';
      energy_saving = '0%';
      break;
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text
                style={{
                  color: '#295675',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Recomendación pendiente
              </Text>
            </View>
            <View
              style={{
                //flex: 1,
                // justifyContent: "space-between",
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 300,
                height: '15%',
                borderWidth: 2.5,
                borderColor: '#52ADEB',
                borderRadius: 10,
                margin: 20,
              }}>
              <Text>{recommendation}</Text>
            </View>
            <View
              style={{
                width: '80%',
                height: '42%',
                borderWidth: 2.5,
                borderStyle: 'solid',
                borderColor: '#52ADEB',
                borderRadius: 10,
                margin: 20,
              }}>
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
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Edificio 16A</Text>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Lab de Sistemas Telemáticos</Text>
                </View>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{}}>Ahorro Energético esperado</Text>
                <Text style={{fontSize: 30, padding: 10, color: '#295675'}}>
                  {energy_saving}
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonTitle="Aceptar"
                    onPress={() => {
                      setControl().then(r => console.log('se envió control'));
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonTitle="Rechazar"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <>
        <View
          style={{
            width: '100%',
            height: '75%',
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginTop: 100}}>
            <Ionicons name="snow-sharp" size={200} color="#2faeea" />
            <Text style={{paddingTop: 20, fontWeight: 'bold', fontSize: 20, textAlign:'center',color:'black'}}>
                     Temp :
            </Text>
            <Text style={{paddingTop: 20, fontWeight: 'bold', fontSize: 40, textAlign:'center', color:'black'}}>
              {value}ºC
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'center',
              height: '10%',
              marginTop: 60,
            }}>
            <TouchableHighlight onPress={() => console.log('ON')} underlayColor='transparent' activeOpacity={0}>
              <View style={{flex: 1, height:50, marginRight:50}}>
                <Ionicons
                  name="radio-button-on-sharp"
                  size={80}
                  color="#2faeea"
                />
                <Text style={{fontWeight: 'bold', color: 'black', textAlign:'center'}}>ON</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => console.log('OFF')} underlayColor='transparent' activeOpacity={0}>
              <View style={{flex: 1}}>
                <Ionicons
                  name="radio-button-off-sharp"
                  size={80}
                  color="#2faeea"
                />
                <Text style={{fontWeight:'bold', color:'black', textAlign:'center'}}>OFF</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.contentView]}>
          <Text style={{width: 20, textAlign: 'center', left: left, color:'black', paddingBottom:5, fontWeight:'bold'}}>
            {value}
          </Text>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={24}
            minimumValue={16}
            step={1}
            onSlidingComplete={(value) => console.log('tempSlider', value)}
            allowTouchTrack
            trackStyle={{height: 5, backgroundColor: 'transparent'}}
            thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
            thumbProps={{
              children: (
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{bottom: 20, right: 20}}
                  color="#2faeea"
                />
              ),
            }}
          />
        </View>
      </>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    width: '95%',
    height: windowHeight / 5,
    backgroundColor: '#32A9E9',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});

export default HomeScreen;
