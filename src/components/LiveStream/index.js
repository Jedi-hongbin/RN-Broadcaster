import React, {useRef, useState, useCallback, useMemo} from 'react';
import {View, Button, StyleSheet, Alert, Text} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {useNavigation, useRoute} from '@react-navigation/native';
import nodeCameraConfig from './nodeCameraConfig';

const LiveStream = () => {
  const NodeCamera = useRef(null);
  const navigation = useNavigation();
  const {
    params: {outputUrl},
  } = useRoute();
  console.log('outputUrl:', outputUrl);
  const [statusCode, setStatusCode] = useState('');

  const backScreen = useCallback(() => {
    if (statusCode !== 2001) {
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
  }, [statusCode, navigation]);

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

  const liveStatus = useMemo(
    () =>
      statusCode === 2000
        ? 'Connecting...'
        : statusCode === 2002
        ? 'Connect.Failed'
        : statusCode === 2004 || statusCode === 2005
        ? 'Connect.Closed'
        : '',
    [statusCode],
  );

  const memoStopButton = useMemo(
    () =>
      statusCode === 2001 ? <Button title="stop" onPress={stopLive} /> : null,
    [statusCode, stopLive],
  );

  const memoStarButton = useMemo(
    () => <Button title="start" onPress={startLive} />,
    [startLive],
  );

  const memoSwitchCameraButton = useMemo(
    () => <Button title="switchCamera" onPress={switchCamera} />,
    [switchCamera],
  );

  const memoBackButton = useMemo(
    () => (
      <View style={styles.back}>
        <Button title="back" onPress={backScreen} />
      </View>
    ),
    [backScreen],
  );

  const onStatus = useCallback((e, m) => {
    console.log('statueChange', e, m);
    setStatusCode(() => e);
  }, []);

  return (
    <View style={styles.container}>
      <NodeCameraView
        ref={NodeCamera}
        style={styles.nodeCameraView}
        outputUrl={outputUrl}
        onStatus={onStatus}
        {...nodeCameraConfig}
      />
      {memoBackButton}
      <Text style={styles.liveStatus}>{liveStatus}</Text>
      <View style={styles.bottomView}>
        {memoStarButton}
        {memoStopButton}
        {memoSwitchCameraButton}
      </View>
    </View>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  container: {flex: 1},
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
  liveStatus: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  nodeCameraView: {...StyleSheet.absoluteFill, height: '100%'},
});
/* <NodeCameraView
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
        autoprefixer={true}
      /> */
