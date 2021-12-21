import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
var db = firestore();

const HomeScreen = () => {
  const [controlAC, setControlAC] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
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
              {/*<View*/}
              {/*  style={{*/}
              {/*    justifyContent: 'center',*/}
              {/*    alignItems: 'center',*/}
              {/*    margin: 5,*/}
              {/*    paddingBottom: 10,*/}
              {/*    borderBottomWidth: 2,*/}
              {/*    borderBottomColor: '#52ADEB',*/}
              {/*  }}>*/}
              {/*  /!*<Text style={{margin: 5}}>Temperatura actual del AC</Text>*!/*/}
              {/*  /!*<Ionicons name="snow-outline" size={30} color="#52ADEB" />*!/*/}
              {/*  /!*<Text style={{fontSize: 30, padding: 10, color: '#295675'}}>*!/*/}
              {/*  /!*  19ºC*!/*/}
              {/*  /!*</Text>*!/*/}
              {/*</View>*/}
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
            {/*<Text style={styles.modalText}>Hello World!</Text>*/}
            {/*<Pressable*/}
            {/*  style={[styles.button, styles.buttonClose]}*/}
            {/*  onPress={() => setModalVisible(!modalVisible)}>*/}
            {/*  <Text style={styles.textStyle}>Hide Modal</Text>*/}
            {/*</Pressable>*/}
          </View>
        </View>
      </Modal>
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
