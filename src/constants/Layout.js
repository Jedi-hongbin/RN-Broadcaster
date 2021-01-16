import {Platform, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const modal = Platform.OS;

let statusBarHeight = 0;

if (modal === 'android') {
  statusBarHeight = StatusBarManager.HEIGHT;
} else {
  StatusBarManager.getHeight(({height}) => {
    statusBarHeight = height;
  });
}
export {statusBarHeight, modal, useSafeAreaInsets};
