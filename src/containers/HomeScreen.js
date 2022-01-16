import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import FormButton from '../components/FormButton';
import {Slider, Icon} from 'react-native-elements';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight} from '../utils/Dimensions';

var db = firestore();
const screenWidth = Dimensions.get('window').width;
type SlidersComponentProps = {};

const HomeScreen: React.FunctionComponent<SlidersComponentProps> = () => {
  const [controlAC, setControlAC] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [comfort, setComfort] = useState('');

  const left = ((value - 16) * (screenWidth - 33)) / 9;

  const setControl = async ac_value => {
    const database = firebase
      .app()
      .database('https://energy-coach-default-rtdb.firebaseio.com')
      .ref('/recomendation')
      .set({rec: ac_value ? ac_value : controlAC});
  };

  const setUserComfort = async value => {
    const database = firebase
      .app()
      .database('https://energy-coach-default-rtdb.firebaseio.com')
      .ref('/comfort/value')
      .set(value);
  };

  useEffect(() => {
    const onValueChange = firebase
      .app()
      .database('https://energy-coach-default-rtdb.firebaseio.com')
      .ref('/recomendation/rec')
      .on('value', snapshot => {
        // console.log('Temp: ', snapshot.val());
        setTemperature(snapshot.val());
        // console.log('temperatura_guardada', temperature);
      });

    // Stop listening for updates when no longer required
    return () =>
      firebase
        .app()
        .database('https://energy-coach-default-rtdb.firebaseio.com')
        .ref('/recomendation/rec')
        .off('value', onValueChange);
  }, []);

  const addComfort = (level, code) => {
    const current_date = new Date();
    db.collection('Comfort')
      .add({
        comfortLevel: level,
        comfortCode: code,
        date: current_date,
      })
      .then(() => {
        console.log('Comfort added!');
      });
  };

  const aceptedRecommendation = number => {
    //1 aceptado 0 rechazado
    const current_date = new Date();
    db.collection('AcceptedRecommendations').add({
      accepted: number,
      date: current_date,
    });
  };

  useEffect(() => {
    const subscriber = db
      .collection('recommendations')
      .orderBy('datetime', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(function (doc) {
          let item = doc.data();
          // let option = item.option;
          setControlAC(item.option);
          console.log('llego una recomendacion');
          setModalVisible(true);
        });
      });
    return () => subscriber();
  }, []);

  const convertCode = value_to_change => {
    let changed_value;
    switch (value_to_change) {
      case 1:
        changed_value = 22;
        break;
      case 3:
        changed_value = 16;
        break;
      case 4:
        changed_value = 17;
        break;
      case 5:
        changed_value = 18;
        break;
      case 6:
        changed_value = 19;
        break;
      case 7:
        changed_value = 20;
        break;
      case 8:
        changed_value = 21;
        break;
      case 9:
        changed_value = 22;
        break;
      case 10:
        changed_value = 23;
        break;
      case 11:
        changed_value = 24;
        break;
      case 24:
        changed_value = 11;
        break;
      case 23:
        changed_value = 10;
        break;
      case 22:
        changed_value = 9;
        break;
      case 21:
        changed_value = 8;
        break;
      case 20:
        changed_value = 7;
        break;
      case 19:
        changed_value = 6;
        break;
      case 18:
        changed_value = 5;
        break;
      case 17:
        changed_value = 4;
        break;
      case 16:
        changed_value = 3;
        break;
    }
    return changed_value;
  };

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
      recommendation = 'Cambiar temperatura a 16º';
      energy_saving = '5%';
      break;
    case 4:
      recommendation = 'Cambiar temperatura a 17º';
      energy_saving = '0%';
      break;
    case 5:
      recommendation = 'Cambiar temperatura a 18º';
      energy_saving = '0%';
      break;
    case 6:
      recommendation = 'Cambiar temperatura a 19º';
      energy_saving = '0%';
      break;
    case 7:
      recommendation = 'Cambiar temperatura a 20º';
      energy_saving = '0%';
      break;
    case 8:
      recommendation = 'Cambiar temperatura a 21º';
      energy_saving = '0%';
      break;
    case 9:
      recommendation = 'Cambiar temperatura a 22º';
      energy_saving = '0%';
      break;
    case 10:
      recommendation = 'Cambiar temperatura a 23º';
      energy_saving = '0%';
      break;
    case 11:
      recommendation = 'Cambiar temperatura a 24º';
      energy_saving = '0%';
      break;
    case 11:
      recommendation = 'Mantener estadoº';
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
                      aceptedRecommendation(1);
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonTitle="Rechazar"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      aceptedRecommendation(0);
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
            height: '60%',
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginTop: 50}}>
            <Ionicons name="snow-sharp" size={150} color="#2faeea" />
            <Text
              style={{
                paddingTop: 20,
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                color: 'black',
              }}>
              Temp:
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontWeight: 'bold',
                fontSize: 40,
                textAlign: 'center',
                color: 'black',
              }}>
              {convertCode(temperature)
                ? convertCode(temperature) + 'ºC'
                : 'OFF'}
              {/*{convertCode(temperature)}ºC ? */}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'center',
              height: 0,
              marginTop: 30,
            }}>
            <TouchableHighlight
              onPress={() =>
                setControl(1).then(r => console.log('se encendió AC'))
              }
              underlayColor="transparent"
              activeOpacity={0}>
              <View style={{flex: 1, height: 50, marginRight: 50}}>
                <Ionicons
                  name="radio-button-on-sharp"
                  size={80}
                  color="#2faeea"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  ON
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() =>
                setControl(2).then(r => console.log('se apagó AC'))
              }
              underlayColor="transparent"
              activeOpacity={0}>
              <View style={{flex: 1}}>
                <Ionicons
                  name="radio-button-off-sharp"
                  size={80}
                  color="#2faeea"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  OFF
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={{
            paddingLeft: 30,
            paddingRight: 30,
          }}>
          <Text
            style={{
              width: 20,
              textAlign: 'center',
              left: left,
              color: 'black',
              paddingBottom: 0,
              fontWeight: 'bold',
            }}>
            {value}
          </Text>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={24}
            minimumValue={16}
            step={1}
            onSlidingComplete={value => {
              let codeAC = convertCode(value);
              setControl(codeAC).then(console.log('se cambió temp a:', value));
            }}
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
        <View
          style={{
            marginTop: 20,
            alignItem: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              fontSize: 20,
            }}>
            Estado de confort: {comfort}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItem: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          <TouchableHighlight
            onPress={() => {
              setUserComfort(0).then(setComfort('Frio'));
              addComfort('Cold', '0');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{flex: 1, height: 50, margin: 20}}>
              <Ionicons name="snow-outline" size={80} color="#2faeea" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                FRIO
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setUserComfort(1).then(setComfort('Neutral'));
              addComfort('Neutral', '1');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{flex: 1, margin: 20}}>
              <Ionicons name="happy-outline" size={80} color="#D4AC0D" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                NEUTRAL
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setUserComfort(2).then(setComfort('Calor'));
              addComfort('Hot', '2');
            }}
            underlayColor="transparent"
            activeOpacity={0}>
            <View style={{flex: 1, margin: 20}}>
              <Ionicons name="flame" size={80} color="#E67E22" />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                CALOR
              </Text>
            </View>
          </TouchableHighlight>
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
