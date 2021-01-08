import React, {useRef} from 'react';
import {SafeAreaView, StatusBar, Text, Button} from 'react-native';
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';

const App: () => React$Node = () => {
  const Broadcaster = useRef(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>hello</Text>
        <RNBambuserBroadcaster
          style={{width: '100%', height: 200, backgroundColor: '#000'}}
          ref={Broadcaster}
          title="test title"
          Aspect={{width: 1, height: 2}}
          onStartBroadcastNotReady={(e) => {
            console.log('onStartBroadcastNotReady:', e);
          }}
          onBroadcastStarted={(e) => {
            console.log('onBroadcastStarted:', e);
          }}
          onBroadcastError={(errorCode, errorMessage) => {
            console.log('onBroadcastError:', errorCode, errorMessage);
          }}
          applicationId={'7iR4RifZUagPInJu2t4aMg'}
        />
        <Button
          title="start"
          onPress={() => {
            Broadcaster?.current.startBroadcast();
          }}
        />
        <Button
          title="stop"
          onPress={() => {
            Broadcaster?.current.stopBroadcast();
          }}
        />
      </SafeAreaView>
    </>
  );
};
export default App;
