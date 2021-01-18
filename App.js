import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Button,
  PermissionsAndroid,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LiveStream from './src/components/LiveStream';
import Clipboard from '@react-native-community/clipboard';
import {modal} from './src/constants/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="LiveStream"
            component={LiveStream}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;

const Home = () => {
  const {navigate} = useNavigation();
  const [outputUrl, setOutputUrl] = useState('');

  const goLiveStream = useCallback(async () => {
    modal === 'android' && (await requestPermission());
    navigate('LiveStream', {outputUrl});
  }, [outputUrl, requestPermission, navigate]);

  const requestPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Cool Photo App Camera And Microphone Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted:', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera👌');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn('err', err);
    }
  }, []);

  const pasteOutputUrl = useCallback(async () => {
    const url = await Clipboard.getString();
    setOutputUrl(() => url);
    console.log(url);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={setOutputUrl}
            value={outputUrl}
            placeholder="input outputUrl"
            style={styles.textInput}
          />
          <Button title="paste" onPress={pasteOutputUrl} />
        </View>
        <MaterialIcons name="home" size={25} color="#faa" />
        <Button title="live stream" onPress={goLiveStream} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, padding: 10},
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    flex: 1,
    minHeight: 50,
    color: '#FFF',
    margin: 5,
    marginLeft: 0,
    paddingLeft: 10,
    backgroundColor: '#CCC',
  },
});
