import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ReportScreen = () => {
  const [labelsArray, setLabelsArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  var db = firestore();
  const [dict, setDict] = useState({});
  const [dictShelly, setDictShelly] = useState({});

  // console.log('->', labelsArray, dataArray);
  useEffect(() => {
    db.collection('shellyData')
      .orderBy('datetime', 'desc')
      .limit(48)
      .get()
      .then(function (querySnapshot) {
        const dictInterno = {};
        querySnapshot.docs.map(function (doc) {
          let item = doc.data();
          let consumo = item.consumption;
          let date = item.datetime.toDate().getHours();
          if (date in dictInterno) {
            dictInterno[date] = dictInterno[date] + consumo;
          } else {
            dictInterno[date] = consumo;
          }
        });
        setDictShelly(dictInterno);
      });
  }, []);

  useEffect(() => {
    db.collection('sensor_data')
      .orderBy('datetime', 'desc')
      .limit(48)
      .get()
      .then(function (querySnapshot) {
        const ArrayInterno1 = [];
        const ArrayInterno2 = [];
        const dictInterno = {};
        querySnapshot.docs.map(function (doc) {
          let item = doc.data();
          let consumo = item.consumption;
          ArrayInterno1.push(consumo);
          let date = item.datetime.toDate().getHours();

          if (date in dictInterno) {
            dictInterno[date] = dictInterno[date] + consumo;
          } else {
            dictInterno[date] = consumo;
          }
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
          //     date = 'S??bado';
          //     break;
          // }
          ArrayInterno2.push(date);
          // console.log(dictInterno, 'dictInterno');
        });

        setLabelsArray(ArrayInterno2.reverse());
        setDataArray(ArrayInterno1);
        // console.log(dictInterno);
        setDict(dictInterno);
      });
  }, []);
  console.log(dict, 'hols');
  console.log(dictShelly, 'shelly');
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#ffff',
    backgroundGradientTo: '#ffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    //labels: labelsArray,
    labels: Object.keys(dict),
    datasets: [
      {
        //data: [1,2,3,4,5,6,7],
        data: Object.values(dict),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Consumption'], // optional
  };

  const dataShelly = {
    //labels: labelsArray,
    labels: Object.keys(dictShelly),
    datasets: [
      {
        //data: [1,2,3,4,5,6,7],
        data: Object.values(dictShelly),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Consumption'], // optional
  };

  return (
    <View
      style={{
        backgroundColor: '#ffff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          fontWeight: 'bold',
          height: '10%',
          borderWidth: 2,
          borderColor: '#52ADEB',
          borderRadius: 15,
          margin: 10,
          fontSize: 16,
        }}>
        Tabla de Consumo en edificio
      </Text>
      {data.datasets[0].data.length > 0 && (
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
      )}
      <Text
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          fontWeight: 'bold',
          height: '10%',
          borderWidth: 2,
          borderColor: '#52ADEB',
          borderRadius: 15,
          margin: 10,
          fontSize: 16,
        }}>
        Tabla de Consumo de AC
      </Text>
      {dataShelly.datasets[0].data.length > 0 && (
        <LineChart
          style={{backgroundColor: '#ffff'}}
          data={dataShelly}
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
      )}
    </View>
  );
};

export default ReportScreen;
