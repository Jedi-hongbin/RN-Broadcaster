import React, {useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Button,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';

const {height, width} = Dimensions.get('window');
const App: () => React$Node = () => {
  const NodeCamera = useRef(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <NodeCameraView
          ref={NodeCamera}
          style={[StyleSheet.absoluteFill, {height}]}
          outputUrl={
            'rtmp://125087.livepush.myqcloud.com/live/nodemedia?txSecret=91b92743eb120a4c6f33468512a08857&txTime=5FFD4A2D'
          }
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 2,
            bitrate: 400000,
            profile: 1,
            fps: 30, //[15,20,24,30]
            videoFrontMirror: false,
          }}
          autopreview={true}
          denoise={true}
          smoothSkinLevel={5}
          onStatus={(e) => console.log('onStatueChange', e)}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Button
            title="start"
            onPress={() => {
              NodeCamera?.current.start();
            }}
          />
          <Button
            title="stop"
            onPress={() => {
              NodeCamera?.current.stop();
            }}
          />
          <Button
            title="switchCamera"
            onPress={() => {
              NodeCamera?.current.switchCamera();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
export default App;
