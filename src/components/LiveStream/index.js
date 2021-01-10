import React, {useRef, useState, useCallback} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {useNavigation} from '@react-navigation/native';

const outputUrl =
  'rtmp://push.hongbin.xyz/xstore/test?auth_key=1610323200-0-0-d20f4fbb9d310a4a272ec27f6b14efad';

// 'rtmp://125087.livepush.myqcloud.com/live/nodemedia?txSecret=91b92743eb120a4c6f33468512a08857&txTime=5FFD4A2D';
const LiveStream = () => {
  const NodeCamera = useRef(null);
  const navigation = useNavigation();
  const [live, setLive] = useState(false);

  const backScreen = useCallback(() => {
    if (!live) {
      return navigation.goBack();
    }

    Alert.alert('Make sure to leave?', 'The live broadcast is still closed', [
      {text: "Don't leave", style: 'cancel'},
      {
        text: 'Discard',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => navigation.goBack(),
      },
    ]);
  }, [live, navigation]);

  const startLive = useCallback(() => {
    setLive(true);
    NodeCamera?.current.start();
  }, [NodeCamera]);

  const stopLive = useCallback(() => {
    Alert.alert('stop live broadcast', null, [
      {text: 'cancel', style: 'cancel'},
      {
        text: 'stop',
        onPress: () => {
          setLive(false);
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
        onStatus={(e) => console.log('statueChange', e)}
      />
      <View style={styles.back}>
        <Button title="back" onPress={backScreen} />
      </View>
      <View style={styles.bottomView}>
        <Button title="start" onPress={startLive} />
        <Button title="stop" onPress={stopLive} />
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
