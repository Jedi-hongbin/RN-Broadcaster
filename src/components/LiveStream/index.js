import React, {useRef, useState, useCallback} from 'react';
import {View, Button, StyleSheet, Alert, Text} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {useNavigation, useRoute} from '@react-navigation/native';

const LiveStream = () => {
  const NodeCamera = useRef(null);
  const navigation = useNavigation();
  const {
    params: {outputUrl},
  } = useRoute();
  console.log('outputUrl:', outputUrl);
  const [stateCode, setStateCode] = useState('');

  const backScreen = useCallback(() => {
    if (stateCode !== 2001) {
      return navigation.goBack();
    }

    Alert.alert('Make sure to leave?', 'The live broadcast is still closed', [
      {text: "Don't leave", style: 'cancel'},
      {
        text: 'Discard',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {
          navigation.goBack();
          NodeCamera?.current.stop();
        },
      },
    ]);
  }, [stateCode, navigation]);

  const startLive = useCallback(() => {
    NodeCamera?.current.start();
  }, [NodeCamera]);

  const stopLive = useCallback(() => {
    Alert.alert('stop live broadcast', null, [
      {text: 'cancel', style: 'cancel'},
      {
        text: 'stop',
        onPress: () => {
          NodeCamera?.current.stop();
        },
      },
    ]);
  }, [NodeCamera]);

  const switchCamera = useCallback(() => NodeCamera?.current.switchCamera(), [
    NodeCamera,
  ]);

  return (
    <View style={{flex: 1}}>
      <NodeCameraView
        ref={NodeCamera}
        style={[StyleSheet.absoluteFill, {height: '100%'}]}
        outputUrl={outputUrl}
        camera={{cameraId: 1, cameraFrontMirror: true}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 4,
          bitrate: 400000,
          profile: 1,
          fps: 30, //[15,20,24,30]
          videoFrontMirror: false,
        }}
        autopreview={true}
        denoise={true}
        smoothSkinLevel={5}
        onStatus={(e, m) => {
          console.log(typeof e);
          console.log('statueChange', e, m);
          setStateCode(() => e);
        }}
      />
      {/* <NodeCameraView
        style={{height: 400}}
        ref={NodeCamera}
        outputUrl={outputUrl}
        camera={{cameraId: 1, cameraFrontMirror: true}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 12,
          bitrate: 400000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview={true}
      /> */}

      <View style={styles.back}>
        <Button title="back" onPress={backScreen} />
      </View>
      <Text
        style={{
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: 22,
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
        {stateCode === 2000
          ? 'Connecting...'
          : stateCode === 2002
          ? 'Connect.Failed'
          : stateCode === 2004 || stateCode === 2005
          ? 'Connect.Closed'
          : ''}
      </Text>
      <View style={styles.bottomView}>
        <Button title="start" onPress={startLive} />
        {stateCode === 2001 ? <Button title="stop" onPress={stopLive} /> : null}
        <Button title="switchCamera" onPress={switchCamera} />
      </View>
    </View>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 20,
    left: 0,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
