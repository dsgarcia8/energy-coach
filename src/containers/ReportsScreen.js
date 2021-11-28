import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = () => {
  const [labelsArray, setLabelsArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  var db = firestore();
  // console.log('->', labelsArray, dataArray);
  useEffect(() => {
    db.collection('sensor_data')
      .orderBy('datetime', 'desc')
      .limit(7)
      .get()
      .then(function (querySnapshot) {
        const ArrayInterno1 = [];
        const ArrayInterno2 = [];
        querySnapshot.docs.map(function (doc) {
          let item = doc.data();
          let consumo = item.consumption;
          ArrayInterno1.push(consumo);
          let date = item.datetime.toDate().getHours();
          // switch (date) {
          //   case 0:
          //     date = 'Domingo';
          //     break;
          //   case 1:
          //     date = 'Lunes';
          //     break;
          //   case 2:
          //     date = 'Martes';
          //     break;
          //   case 3:
          //     date = 'Miercoles';
          //     break;
          //   case 4:
          //     date = 'Jueves';
          //     break;
          //   case 5:
          //     date = 'Viernes';
          //     break;
          //   case 6:
          //     date = 'Sábado';
          //     break;
          // }
          ArrayInterno2.push(date);
        });
        setLabelsArray(ArrayInterno2.reverse());
        setDataArray(ArrayInterno1);
      });
  }, []);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: labelsArray,
    datasets: [
      {
        data: [1,2,3,4,5,6,7],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Consumption'], // optional
  };

  return (
    <View>
      <Text
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          height: '15%',
          borderWidth: 5,
          borderColor: '#52ADEB',
          borderRadius: 15,
          margin: 20,
        }}>
        Tabla de Consumo
      </Text>
      <LineChart
        data={data}
        width={screenWidth} // from react-native
        height={220}
        yAxisSuffix=" Kw"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 0,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default ProfileScreen;
